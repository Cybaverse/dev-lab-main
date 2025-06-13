from http.client import HTTPException
from core import app, results, globalSettings
import models.results

@app.app.get(f"/api/1.0/results",
    tags=["Results"],
    summary = "/results",
    description = "Get Results",
)
async def getResults(search: str = ""
) -> models.results.getResultsResponse:
    resultsList = next(results._result().query(json=True),[])

    if search:
        search = search.lower()
        resultsList = [
            r for r in resultsList
            if search in r.get("name", "").lower()
        ]

    return models.results.getResultsResponse(results=resultsList)

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
        results._result().new(name, mainType)
        return {"msg": "Successful"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))