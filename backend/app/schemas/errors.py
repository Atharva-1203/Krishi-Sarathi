from pydantic import BaseModel
from typing import List

class ErrorItem(BaseModel):
    loc: List[str]
    msg: str
    type: str

class HTTPErrorResponse(BaseModel):
    status: str = "error"
    message: str
    details: List[ErrorItem] = []
