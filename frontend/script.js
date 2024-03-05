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
           <div class="review mt-3" data-city="${review.city.toLowerCase()}">
               <h3>${review.city}</h3>
               <p>Rating: ${review.rating}</p>
               <p>${review.description}</p>
               <button class = "btn btn-outline-primary" onclick="deleteReview('${review.city.toLowerCase()}')">Delete</button>
               <button class = "btn btn-secondary" onclick="editReview('${review.city}')">Edit</button>
           </div>
       `;
         })
      })
}

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



// Event listeners
submitButton.addEventListener('click', addReview)

// Initial fetch of items
document.addEventListener('DOMContentLoaded', fetchReviews);











