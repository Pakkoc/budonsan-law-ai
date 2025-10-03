# Hybrid Legal Q&A Platform: Official Code Guideline

## 1. Project Overview

This document establishes the official coding standards for the Hybrid Legal Q&A Platform. Our architecture is designed for rapid development, scalability, and maintainability, leveraging a modern, decoupled stack.

-   **Frontend**: A server-side rendered (SSR) web application built with **Next.js (App Router)** and styled with **Tailwind CSS**, hosted on **Vercel**.
-   **Backend API**: A high-performance REST API built with **FastAPI (Python)**, responsible for business logic and AI orchestration, hosted on **Fly.io**.
-   **Unified Backend-as-a-Service (BaaS)**: **Supabase** provides the core infrastructure, including the **Postgres** database (with **pgvector**), **Authentication**, and **Storage** (interfacing with **Cloudflare R2**).

The key architectural principle is a clear separation of concerns: the Next.js client is fully decoupled from the FastAPI backend, communicating via a well-defined REST API. The client may interact directly with Supabase for authentication and simple data retrieval secured by Row Level Security (RLS).

## 2. Core Principles

These principles are the foundation of our engineering culture and must guide all development decisions.

1.  **Clarity Over Cleverness**: Write simple, self-documenting code that a new developer can understand without deep context.
2.  **Security by Design**: Implement security at every layer, from frontend inputs to backend validation and database-level RLS policies.
3.  **Own Your Domain**: The frontend owns presentation and user state. The backend owns business logic, data integrity, and AI processes.
4.  **Type Safety is Non-Negotiable**: Strictly leverage TypeScript and Pydantic to catch errors at build time, not runtime.

## 3. Language-Specific Guidelines

### Next.js (TypeScript / App Router)

#### Directory Structure

We use a feature-based structure within the App Router paradigm. Group all related files for a feature together to improve locality. Prefix private folders that are not part of the routing with an underscore (`_`).

```text
/src
├── /app
│   ├── /questions
│   │   ├── /[id]
│   │   │   ├── /_components  // Feature-specific components (e.g., AnswerForm.tsx)
│   │   │   ├── /_hooks       // Feature-specific hooks (e.g., useQuestionData.ts)
│   │   │   └── page.tsx      // The route's server component
│   │   └── page.tsx          // The /questions list page
│   ├── layout.tsx
│   └── page.tsx
├── /components
│   ├── /ui                 // Reusable, generic UI components (Button.tsx, Input.tsx)
│   └── /shared             // Reusable, complex components (Header.tsx, Footer.tsx)
├── /lib                    // Supabase client, helpers, utils
└── /types                  // Global type definitions (e.g., database.ts)
```

#### Import & Dependency Management

-   **MUST** use absolute paths for imports using `@/*` configured in `tsconfig.json`.
-   **MUST** group and order imports to maintain consistency.

```typescript
// MUST: Order imports logically
// 1. React / Next.js imports
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. External library imports
import { zodResolver } from '@hookform/resolvers/zod';

// 3. Internal component/module imports
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
```

#### Error Handling

-   **MUST** use `try/catch` blocks within Server Actions and API Route Handlers for robust error management.
-   **MUST** wrap sections of the UI prone to runtime errors in React `<ErrorBoundary>` components to prevent the entire page from crashing.

### FastAPI (Python)

#### Directory Structure

Organize the backend by responsibility to ensure a clean and scalable codebase.

```text
/app
├── /api
│   ├── /v1
│   │   ├── /endpoints      // Routers (e.g., questions.py, lawyers.py)
│   │   └── api.py          // API router aggregator
├── /core                   // Application config, settings
├── /models                 // Pydantic schemas/models
├── /services               // Business logic (e.g., rag_service.py)
├── /db                     // Database session management
└── main.py                 // FastAPI app instantiation
```

#### Dependency Management

-   **MUST** use `Poetry` or `pip` with a `requirements.txt` file to manage dependencies.
-   **MUST** pin dependency versions to ensure reproducible builds.

#### Error Handling

-   **MUST** use FastAPI's exception handlers to catch specific exceptions and return standardized JSON error responses. This prevents stack traces from leaking to the client.

```python
# MUST: Use custom exception handlers for consistent error responses
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

class InsufficientBalanceError(Exception):
    pass

app = FastAPI()

@app.exception_handler(InsufficientBalanceError)
async def insufficient_balance_exception_handler(request: Request, exc: InsufficientBalanceError):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"message": "Insufficient balance to perform this action."},
    )
```

## 4. Code Style Rules

### MUST Follow:

1.  **Automated Linting and Formatting**: All code MUST pass linter and formatter checks before merging.
    -   **Frontend**: ESLint and Prettier.
    -   **Backend**: Ruff and Black.
    -   *Rationale*: Enforces a single, objective style, eliminating debates and improving readability.

2.  **Naming Conventions**:
    -   **TypeScript**: `camelCase` for variables and functions. `PascalCase` for components, types, and interfaces.
    -   **Python**: `snake_case` for variables and functions. `PascalCase` for classes.
    -   *Rationale*: Standard conventions for each language make the code predictable.

3.  **Environment Variables**:
    -   All environment variables for the Next.js client that need to be exposed to the browser **MUST** be prefixed with `NEXT_PUBLIC_`.
    -   *Rationale*: This is a Next.js security feature to prevent accidentally leaking server-side secrets to the client.

### MUST NOT Do:

1.  **Do not place business logic in UI components**.
    -   *Rationale*: Components should be responsible for rendering UI. Complex logic makes them difficult to test, reuse, and maintain. Abstract logic into hooks, services, or server-side functions.

    ```typescript
    // MUST NOT: Mix fetching and business logic directly in a component
    function QuestionPage({ id }) {
      const [question, setQuestion] = useState(null);
      useEffect(() => {
        // Bad: direct API call with hardcoded URL
        fetch(`https://api.example.com/questions/${id}`)
          .then(res => res.json())
          .then(data => {
            // Bad: complex data transformation logic here
            const formatted = { ...data, createdAt: new Date(data.createdAt) };
            setQuestion(formatted);
          });
      }, [id]);
      // ... render logic
    }
    ```

2.  **Do not use the `any` type in TypeScript**.
    -   *Rationale*: Using `any` defeats the entire purpose of TypeScript and hides potential bugs. Define a specific `interface` or `type`.

3.  **Do not write raw, unparameterized SQL queries**.
    -   *Rationale*: This is a major security risk (SQL injection). Always use the Supabase client library or an ORM that properly parameterizes queries.

## 5. Architecture Patterns

### Component Structure (Next.js)

-   **MUST** default to Server Components for data fetching and rendering non-interactive UI.
-   **MUST** use the `'use client'` directive only for components that require interactivity (e.g., using hooks like `useState` or `useEffect`). Keep Client Components as small as possible ("at the leaves" of the component tree).

```typescript
// MUST: Proper use of Server and Client Components
// app/questions/[id]/page.tsx (Server Component)
import { supabase } from '@/lib/supabase';
import { QuestionDisplay } from './_components/QuestionDisplay';

export default async function QuestionPage({ params }) {
  // Data is fetched on the server
  const { data: question } = await supabase
    .from('questions')
    .select('*')
    .eq('id', params.id)
    .single();

  return (
    <div>
      <h1>{question.title}</h1>
      {/* Interactive part is isolated in a Client Component */}
      <QuestionDisplay content={question.body} />
    </div>
  );
}

// app/questions/[id]/_components/QuestionDisplay.tsx (Client Component)
'use client';

import { useState } from 'react';

export function QuestionDisplay({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // This component can now use state and event handlers
  return (
    <div>
      <p>{isExpanded ? content : `${content.substring(0, 100)}...`}</p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
}
```

### Data Flow

-   **Client <-> Supabase**: Use the Supabase JS client directly for **authentication** and **simple data reads/writes** that can be fully secured with RLS policies.
-   **Client <-> FastAPI**: Use our FastAPI backend for all **complex business logic**, **AI-related operations**, and actions requiring elevated privileges or transactions (e.g., a lawyer submitting an answer and deducting credit).

### State Management

-   **MUST** start with React's built-in state management hooks (`useState`, `useReducer`, `useContext`).
-   **MUST NOT** introduce a global state management library (e.g., Redux, Zustand) for the MVP. Use URL state (search params) for managing global state like filters or pagination where possible.

### API Design (FastAPI)

-   **MUST** use Pydantic models for all API request bodies and responses. This provides automatic data validation, conversion, and OpenAPI documentation.
-   **MUST** follow RESTful principles. Use nouns for resource URLs (e.g., `/questions`) and HTTP verbs for actions (`POST`, `GET`, `PUT`).

```python
# MUST: Use Pydantic models for type-safe API contracts
from fastapi import FastAPI
from pydantic import BaseModel

class QuestionCreate(BaseModel):
    title: str
    body: dict
    category: str

class QuestionResponse(BaseModel):
    id: UUID
    title: str
    ai_answer: dict

app = FastAPI()

@app.post("/questions", response_model=QuestionResponse, status_code=201)
async def create_question(question: QuestionCreate):
    # Pydantic automatically validates the incoming request body.
    # If validation fails, it returns a 422 error.
    # ... service logic to process the question ...
    new_question = await question_service.create(question)
    return new_question
```