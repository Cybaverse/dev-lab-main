from http.client import HTTPException
from core import app, results, globalSettings
from pydantic import BaseModel
from fastapi import Query
import models.results

@app.app.get(
    "/api/1.0/results",
    tags=["Results"],
    summary="/results",
    description="Get Results",
)
async def getResults(
    search: str = Query(default=None, description="Search term for filtering results by name")
) -> models.results.getResultsResponse:
    
    resultsList = next(results._result().query(json=True), [])

    if search:
        resultsList = [r for r in resultsList if search.lower() in r["name"].lower()]

    plainResults = []

    for r in resultsList:
        plainResults.append({
            "_id": r.get("_id"),
            "name": r.get("name"),
            "mainType": r.get("mainType"),
            "email": r.get("email")  
        })

    return models.results.getResultsResponse(results=plainResults)

@app.app.post(
    "/api/1.0/new",
    tags=["Results"],
    summary="/new (create)",
    description="Create a new result",
)
async def createResult(body: dict) -> models.results.NewResultResponse:
    try:
        name = body.get("name")
        mainType = body.get("type")
        email = body.get("email")
        results._result().new(name, mainType, email)
        return {"msg": "Successful"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
