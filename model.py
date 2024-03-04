from typing import Optional
from pydantic import BaseModel

class Travel(BaseModel):
   city: str
   rating: int 
   description: str 

class TravelRequest(BaseModel):
   city: Optional[str] = None
   rating: Optional[int] = None
   description: Optional[str] = None
