from fastapi import APIRouter, Path, HTTPException, Query, status
from model import Travel, TravelRequest
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

travel_router = APIRouter()

travel_list: list[Travel] = []



@travel_router.get("/travels")
async def get_travels():
   json_compatible_item_data = jsonable_encoder(travel_list)
   return JSONResponse(content=json_compatible_item_data) 


# Resonse model shows an example output in the docs
@travel_router.get("/travels/{city}", response_model = Travel)
async def get_travel_by_city(city: str = Path(..., description = "City's name of the review you want to view.")):
   for review in travel_list:
      if review.city.lower() == city.lower():
         return review
   
   raise HTTPException(
      status_code = status.HTTP_404_NOT_FOUND,
      detail = f"A review for {city} does not exist."
   )



@travel_router.post("/travels", status_code=status.HTTP_201_CREATED)
async def add_travel(travel: Travel) -> dict:
   for element in travel_list:
      if element.city.lower() == travel.city.lower():

         raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = f"A review for {travel.city} already exists."
            )
      
   travel_list.append(travel)

   # Need to convert it since JSONResponse expects a JSON object
   json_compatible_item_data = travel.model_dump() 
   return JSONResponse(json_compatible_item_data, status_code=status.HTTP_201_CREATED)



@travel_router.delete("/travels/{city}")
async def delete_travel(city: str = Path(..., description = "City's name of the review you want to delete.")) -> dict:
   for element in travel_list:
      if element.city.lower() == city.lower():
         travel_list.remove(element)
         return {"Success": "travel item deleted"}
   
   raise HTTPException(
      status_code = status.HTTP_409_CONFLICT,
      detail = f"A review for {city} does not exist."
   )



@travel_router.put("/travels/{city}", status_code = status.HTTP_200_OK)
async def update_travel(*, city: str = Path(description="Name of city you would like to update."), updateTravel: TravelRequest) -> Travel:
   for review in travel_list:
      if review.city.lower() == city.lower():
         if updateTravel.city:
            review.city = updateTravel.city
         if updateTravel.rating:
            review.rating = updateTravel.rating
         if updateTravel.description:
            review.rating = updateTravel.rating
         
         return review
   
   raise HTTPException(
      status_code = status.HTTP_404_NOT_FOUND,
      detail = f"A review for {city} does not exist."
   )


