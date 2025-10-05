"""RAG (Retrieval-Augmented Generation) service for AI Q&A."""

from __future__ import annotations

from typing import Any

from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from supabase import Client, create_client

from app.core.config import Settings

# Prompt template for legal Q&A
QA_PROMPT_TEMPLATE = """당신은 부동산 법률 전문 AI 어시스턴트입니다.
주어진 법령 정보를 기반으로 정확하고 신뢰할 수 있는 답변을 제공하세요.

다음 법령 정보를 참고하세요:
{context}

질문: {question}

답변 작성 시 다음을 준수하세요:
1. 제공된 법령 정보만을 기반으로 답변하세요
2. 답변의 근거가 된 법령명과 조항을 명시하세요
3. 확실하지 않은 경우 "제공된 법령 정보로는 확인할 수 없습니다"라고 말하세요
4. 법적 조언이 아님을 명시하고, 전문가 상담을 권유하세요

답변:"""


class RAGService:
    """Service for RAG-based Q&A using LangChain and Supabase vector store."""

    def __init__(self, settings: Settings):
        self.settings = settings
        self._supabase_client: Client | None = None
        self._embeddings: OpenAIEmbeddings | None = None
        self._llm: ChatOpenAI | None = None
        self._vector_store: SupabaseVectorStore | None = None
        self._qa_chain: RetrievalQA | None = None

    @property
    def supabase_client(self) -> Client:
        """Lazy-load Supabase client."""
        if self._supabase_client is None:
            self._supabase_client = create_client(
                self.settings.supabase_url,
                self.settings.supabase_service_role_key,
            )
        return self._supabase_client

    @property
    def embeddings(self) -> OpenAIEmbeddings:
        """Lazy-load OpenAI embeddings."""
        if self._embeddings is None:
            self._embeddings = OpenAIEmbeddings(
                model=self.settings.openai_embedding_model,
                openai_api_key=self.settings.openai_api_key,
            )
        return self._embeddings

    @property
    def llm(self) -> ChatOpenAI:
        """Lazy-load ChatOpenAI LLM."""
        if self._llm is None:
            self._llm = ChatOpenAI(
                model=self.settings.openai_chat_model,
                temperature=0.1,  # Low temperature for factual answers
                openai_api_key=self.settings.openai_api_key,
            )
        return self._llm

    @property
    def vector_store(self) -> SupabaseVectorStore:
        """Lazy-load Supabase vector store."""
        if self._vector_store is None:
            self._vector_store = SupabaseVectorStore(
                client=self.supabase_client,
                embedding=self.embeddings,
                table_name=self.settings.supabase_vector_table,
                query_name=self.settings.supabase_vector_query_name,
            )
        return self._vector_store

    @property
    def qa_chain(self) -> RetrievalQA:
        """Lazy-load QA chain."""
        if self._qa_chain is None:
            prompt = PromptTemplate(
                template=QA_PROMPT_TEMPLATE,
                input_variables=["context", "question"],
            )
            self._qa_chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.vector_store.as_retriever(
                    search_kwargs={"k": 5},  # Retrieve top 5 relevant chunks
                ),
                return_source_documents=True,
                chain_type_kwargs={"prompt": prompt},
            )
        return self._qa_chain

    async def answer_question(self, question: str) -> dict[str, Any]:
        """
        Generate AI answer for a question using RAG.

        Args:
            question: User question

        Returns:
            Dictionary with 'answer' and 'sources' keys
        """
        result = await self.qa_chain.ainvoke({"query": question})

        # Extract source information
        sources = []
        for doc in result.get("source_documents", []):
            metadata = doc.metadata
            sources.append(
                {
                    "document_id": metadata.get("document_id"),
                    "chunk_index": metadata.get("chunk_index"),
                    "content": doc.page_content[:200],  # First 200 chars as preview
                    "metadata": metadata,
                }
            )

        return {
            "content": result["result"],
            "sources": sources,
            "model": self.settings.openai_chat_model,
        }

    async def ingest_pdf(self, pdf_path: str, document_id: str) -> int:
        """
        Ingest a PDF document into the vector store.

        Args:
            pdf_path: Path to the PDF file
            document_id: UUID of the document in the database

        Returns:
            Number of chunks created
        """
        # Load PDF
        loader = PyPDFLoader(pdf_path)
        pages = loader.load()

        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.settings.rag_chunk_size,
            chunk_overlap=self.settings.rag_chunk_overlap,
            length_function=len,
        )
        chunks = text_splitter.split_documents(pages)

        # Add metadata
        for index, chunk in enumerate(chunks):
            chunk.metadata["document_id"] = document_id
            chunk.metadata["chunk_index"] = index

        # Store in vector database
        await self.vector_store.aadd_documents(chunks)

        return len(chunks)
