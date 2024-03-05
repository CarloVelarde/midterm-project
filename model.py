from typing import Optional
from pydantic import BaseModel, validator

class Travel(BaseModel):
   city: str
   rating: int 
   description: str 

   # Ensures ratings between 1-5
   @validator('rating')
   def validate_rating(cls, value):
       if not 1 <= value <= 5:
           raise ValueError('Rating must be between 1 and 5')
       return value

class TravelRequest(BaseModel):
   city: Optional[str] = None
   rating: Optional[int] = None
   description: Optional[str] = None

   # Ensures ratings between 1-5
   @validator('rating', allow_reuse=True)
   def validate_rating(cls, value):
      if value is not None and not 1 <= value <= 5:
         raise ValueError('Rating must be between 1 and 5')
      return value