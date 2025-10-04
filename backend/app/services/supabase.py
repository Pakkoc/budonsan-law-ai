from __future__ import annotations

from typing import Any, Literal

import httpx
from fastapi import HTTPException, status

from app.core.config import Settings

JsonDict = dict[str, Any]


class SupabaseService:
    def __init__(self, settings: Settings):
        self._rest_url = settings.supabase_url.rstrip("/") + "/rest/v1"
        self._service_key = settings.supabase_service_role_key
        self._headers = {
            "apikey": self._service_key,
            "Authorization": f"Bearer {self._service_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    async def create_question(self, user_id: str, payload: JsonDict) -> JsonDict:
        body = {**payload, "user_id": user_id}
        data = await self._post("/questions", body)
        return data[0]

    async def fetch_question(self, question_id: str) -> JsonDict:
        params = {
            "id": f"eq.{question_id}",
            "select": "*,answers(*)",
        }
        data = await self._get("/questions", params=params)
        if not data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
        record = data[0]
        record.setdefault("answers", [])
        return record

    async def create_answer(self, question_id: str, user_id: str, content: str) -> JsonDict:
        body = {
            "question_id": question_id,
            "lawyer_id": user_id,
            "content": content,
        }
        data = await self._post("/answers", body)
        return data[0]

    async def get_lawyer_profile(self, user_id: str) -> JsonDict | None:
        params = {
            "select": "*",
            "user_id": f"eq.{user_id}",
        }
        data = await self._get("/lawyer_profiles", params=params)
        return data[0] if data else None

    async def upsert_lawyer_profile(self, user_id: str, profile: JsonDict) -> JsonDict:
        body = {**profile, "user_id": user_id}
        data = await self._upsert("/lawyer_profiles", body, params={"on_conflict": "user_id"})
        return data[0]

    async def update_lawyer_status(
        self,
        user_id: str,
        *,
        status_value: Literal["approved", "pending", "rejected"],
        balance_override: int | None = None,
    ) -> JsonDict:
        update_payload: JsonDict = {"verification_status": status_value}
        if balance_override is not None:
            update_payload["balance"] = balance_override
        data = await self._patch(
            "/lawyer_profiles",
            update_payload,
            params={"user_id": f"eq.{user_id}"},
        )
        if not data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lawyer profile not found")
        return data[0]

    async def deduct_lawyer_balance(self, user_id: str, new_balance: int) -> JsonDict:
        data = await self._patch(
            "/lawyer_profiles",
            {"balance": new_balance},
            params={"user_id": f"eq.{user_id}"},
        )
        if not data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lawyer profile not found")
        return data[0]

    async def create_document(self, payload: JsonDict) -> JsonDict:
        data = await self._post("/documents", payload)
        return data[0]

    async def _get(self, path: str, *, params: dict[str, str] | None = None) -> list[JsonDict]:
        async with httpx.AsyncClient(base_url=self._rest_url, headers=self._headers, timeout=10.0) as client:
            response = await client.get(path, params=params)
        return self._handle_response(response)

    async def _post(self, path: str, body: JsonDict) -> list[JsonDict]:
        headers = {**self._headers, "Prefer": "return=representation"}
        async with httpx.AsyncClient(base_url=self._rest_url, headers=headers, timeout=10.0) as client:
            response = await client.post(path, json=body)
        return self._handle_response(response)

    async def _upsert(self, path: str, body: JsonDict, *, params: dict[str, str] | None = None) -> list[JsonDict]:
        headers = {**self._headers, "Prefer": "return=representation,resolution=merge-duplicates"}
        async with httpx.AsyncClient(base_url=self._rest_url, headers=headers, timeout=10.0) as client:
            response = await client.post(path, params=params, json=body)
        return self._handle_response(response)

    async def _patch(self, path: str, body: JsonDict, *, params: dict[str, str]) -> list[JsonDict]:
        headers = {**self._headers, "Prefer": "return=representation"}
        async with httpx.AsyncClient(base_url=self._rest_url, headers=headers, timeout=10.0) as client:
            response = await client.patch(path, params=params, json=body)
        return self._handle_response(response)

    @staticmethod
    def _handle_response(response: httpx.Response) -> list[JsonDict]:
        if response.status_code >= 400:
            detail = response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
            raise HTTPException(status_code=response.status_code, detail=detail)
        if response.status_code == status.HTTP_204_NO_CONTENT:
            return []
        payload = response.json()
        if isinstance(payload, list):
            return payload
        if isinstance(payload, dict):
            return [payload]
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unexpected Supabase response format")
