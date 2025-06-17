from pydantic import BaseModel, BeforeValidator, Field, EmailStr
from typing import Annotated, Optional
PyObjectId = Annotated[str, BeforeValidator(str)]

class Result(BaseModel):
    id: PyObjectId = Field(default=None, alias="_id", title="Result ID")
    name: str = Field(..., title="Result Name")
    mainType: str = Field(..., title="Main Type")
    email: Optional[EmailStr] = Field(default=None, title="Email Address")

class getResultsResponse(BaseModel):
    results: list[Result] = Field(..., title="List of Results")

class NewResultResponse(BaseModel):
    msg: str = Field(..., title="Message")
