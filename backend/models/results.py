from pydantic import BaseModel, Field, BeforeValidator
from typing import Annotated
PyObjectId = Annotated[str, BeforeValidator(str)]

class Result(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id", title="Result ID")
    name: str = Field(..., title="Result Name")
    email: str = Field(..., title="Email")
    mainType: str = Field(..., title="Main Type")

class getResultsResponse(BaseModel):
    results: list[Result] = Field(..., title="List of Results")

class NewResultResponse(BaseModel):
    msg: str = Field(..., title="Message")
