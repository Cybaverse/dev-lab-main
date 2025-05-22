from fastapi import FastAPI, Request, Body, Response, HTTPException, status, Depends, Header
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="Lab 1", version="0.1", lifespan=lifespan)

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Error occurred."},
    )

securityResponses = {
    401: {"description": "Unauthorized"},
    403: {"description": "Unauthenticated"},
}

from api import results
from . import database, globalSettings
database.initialize(globalSettings.args.database_url,globalSettings.args.database)