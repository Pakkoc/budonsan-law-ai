from fastapi import FastAPI

from app.api.routes import admin, lawyers, questions

app = FastAPI(title="부동산법률Q API", version="0.1.0")

app.include_router(questions.router)
app.include_router(lawyers.router)
app.include_router(admin.router)


@app.get("/health", tags=["system"], summary="Health check")
def health_check() -> dict[str, str]:
    """Return simple service heartbeat."""
    return {"status": "ok"}
