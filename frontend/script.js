let form = document.getElementById('form-add')
let cityInput = document.getElementById('title')
let ratingInput = document.getElementById('rating')
let descInput = document.getElementById('desc')

let reviews = document.getElementById('reviews')
let submitButton = document.getElementById('submitButton')
let deleteButton = document.getElementById('')

let data = []
let selectedReview = {}

const api = 'http://127.0.0.1:8000/'


// Display reviews
function fetchReviews() {
   fetch(`${api}travels`)
      .then(response => response.json())
      .then(items => {
         reviews.innerHTML = '' // Clear current reviews
         items.forEach(review => {
            reviews.innerHTML += `
           <div class="review mt-3 bg-light p-5 border border-warning rounded" data-city="${review.city.toLowerCase()}">
               <h3 class = "display-6">${review.city}</h3>
               <p class = "lead"><span class = "fw-bold"> Rating: </span> ${review.rating} <i class="fa-solid fa-star"></i></p>
               <p class = "lead" ><span class = "fw-bold"> Description: </span>${review.description}</p>
               <button class = "btn btn-outline-primary" onclick="deleteReview('${review.city.toLowerCase()}')">Delete <i class="fa-solid fa-trash"></i></button>
               <button class = "btn btn-secondary" type = "button" data-bs-toggle="modal" data-bs-target="#updateModal">Edit</button>
           </div>
       `;
         })
      })
}
// onclick="editReview('${review.city.toLowerCase()}')

// Add reviews
function addReview(){
   const newTravel = {
      city: cityInput.value,
      rating: ratingInput.value,
      description: descInput.value 
   }

   fetch(`${api}travels`,{
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTravel),
   }).then(() => {
      fetchReviews();
      cityInput.value = ''
      ratingInput.value = ''
      descInput.value = ''
      
   });
}


// Delete reviews
function deleteReview(city){
   fetch(`${api}travels/${city}`,{
      method: 'DELETE',
   }).then(() => {
      fetchReviews()
   })
}

// EDIT IN PROGRESS NOT FUNCTIONING
let updateRating = document.getElementById('updateRating')
let updateCity = document.getElementById('updateCity')
let updateDesc = document.getElementById('updateDesc')

function editReview(){
   const updatedTravel = {
      city: updateCity.value,
      rating: updateRating.value,
      description: updateDesc.value 
   }
   fetch(`${api}travels/${updatedTravel.city}`,{
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTravel),
   }).then(() => {
      fetchReviews()
   })
}





// Event listeners
submitButton.addEventListener('click', addReview)

document.getElementById("updateButton").addEventListener('click', editReview) // Not working yet





// Initial fetch of items
document.addEventListener('DOMContentLoaded', fetchReviews);













