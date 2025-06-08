# from http.client import HTTPException
from fastapi import HTTPException
from core import app, results, globalSettings
from pydantic import BaseModel, Field
import models.results
import bleach


class NewResultRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Full name is required")
    type: str = Field(..., min_length=1, description="Type is required")


@app.app.get(f"/api/1.0/results",
             tags=["Results"],
             summary="/results",
             description="Get Results",
             )
async def getResults(
) -> models.results.getResultsResponse:
    resultsList = next(results._result().query(json=True), [])
    return models.results.getResultsResponse(results=resultsList)


@app.app.post(
    "/api/1.0/new",
    tags=["Results"],
    summary="/new (create)",
    description="Create a new result",
)
async def createResult(item: NewResultRequest) -> models.results.NewResultResponse:
    try:
        safe_name = bleach.clean(item.name, strip=True)
        if not safe_name:
            raise HTTPException(
                status_code=400, detail="Name contains disallowed content")
        mainType = item.type
        results._result().new(safe_name, mainType)
        return {"msg": "Successful"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
