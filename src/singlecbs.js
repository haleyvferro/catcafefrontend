

// NEW CAT SPONSORSHIP FORM
function addnewCBSButton(patronId){

    const newCBSContainer = document.querySelector("#new-cb-spons");
    const formHolder = document.createElement('div')
    formHolder.innerHTML = `
        <form class="add-cbs-form">
        <label for="breed">Cat Breed:</label>
        <select name="Cat Breeds" id="cat-breeds-select"></select>
        <br>
        <label for="amount">Amount:</label>
        <input type="integer"></input>
        <button type="submit" name="submit" id="cbs-submit">Add Sponsorship</button>
        </form>
    `
    newCBSContainer.append(formHolder)
    addBtn = document.querySelector('#add-cbs-button')

    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      let addCBS = false;
      const form = document.querySelector('#add-cbs-form')
      addCBS = !addCBS;
      if (addCBS) {
        formHolder.style.display = "block";
      } else {
        formHolder.style.display = "none";
      }
    })
    fetchCatBreeds()
    addCBSSubmit(patronId)
}


function fetchCatBreeds(){
    fetch(`${catBreedsUrl}`)
    .then(data => data.json())
    .then(catBreeds => {renderCatBreedList(catBreeds)})
}


function addCBSSubmit(patronId){
    const cbsForm = document.querySelector('#cbs-submit')
    cbsForm.addEventListener('click', (event) => {
        event.preventDefault()
        const breedId = parseInt(event.target.parentNode.children[1].value)
        const amount = parseInt(event.target.parentNode.children[4].value)

        const reqObj = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: amount, patron_id: patronId, cat_breed_id: breedId })
        }
        
        fetch(catBreedSponsorshipsUrl, reqObj)
        .then(resp => resp.json())
        .then(cbSponso => {
            console.log(event.target)
            const catBreedSponsorshipsList = document.querySelector('#patron-catbreed-sponsorships')
            const breed = event.target.parentNode.children[1].value.split(' - ').pop()
            const catBreedLi = document.createElement('li')
            catBreedLi.innerHTML = `
            <p>${breed}   Sponsorship Amount:  $<textarea id="cat_breed_amount">${amount}</textarea></p><br>
            <p><button data-id="${cbSponso.id}" id="update-button-${cbSponso.id}">Update Sponsorship Amount</button><button data-id="${cbSponso.id}" id="delete-${cbSponso.id}">Delete Sponsorship</button>
            `
            catBreedLi.id = `cat_breed_li-${cbSponso.id}`
            catBreedSponsorshipsList.append(catBreedLi)
        })
        cbsForm.parentNode.remove()
        addnewCBSButton(patronId)
    })
}

function renderCatBreedList(catBreeds){
    const catBreedSelect = document.querySelector('#cat-breeds-select')
    catBreeds.forEach(catBreed => {
        const catBreedOption = document.createElement("option")
        catBreedOption.innerText = `${catBreed.id} - ${catBreed.name}`
        catBreedSelect.append(catBreedOption)
    })
}


// RENDER CAT BREED SPONSORSHIP LIST
function renderCatBreedSponsorships(patron){
    const catBreedSponsorshipsList = document.querySelector('#patron-catbreed-sponsorships')
    patron.cat_breed_sponsorships.forEach(cat_breed => {
        const catBreedLi = document.createElement('li')
        catBreedLi.innerHTML = `
        <p>${cat_breed.cat_breed}   Sponsorship Amount:  $<textarea id="cat_breed_amount">${cat_breed.amount}</textarea></p><br>
        <p><button data-id="${cat_breed.cat_breed_sponsorship_id}" id="update-button-${cat_breed.cat_breed_sponsorship_id}">Update Sponsorship Amount</button><button data-id="${cat_breed.cat_breed_sponsorship_id}" id="delete-${cat_breed.cat_breed_sponsorship_id}">Delete Sponsorship</button>
        `
        catBreedLi.id = `cat_breed_li-${cat_breed.cat_breed_sponsorship_id}`
        catBreedSponsorshipsList.append(catBreedLi)
        catSponsAmtUpdate(`${cat_breed.cat_breed_sponsorship_id}`)
        catSponsDelete(`${cat_breed.cat_breed_sponsorship_id}`)
    })
}




// CAT SPONSORSHIP AMOUNT UPDATE BUTTON
function catSponsAmtUpdate(catSponsorshipId){
    const updateButton = document.querySelector(`#update-button-${catSponsorshipId}`)
    updateButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const currentAmount = document.querySelector('#cat_breed_amount').value
        const reqObj =  {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: currentAmount })
        }
        fetch(`${catBreedSponsorshipsUrl}/${id}`, reqObj)
    })
}


//   CAT SPONSORSHIP DELETE BUTTON
function catSponsDelete(catSponsorshipId){
    const deleteButton = document.querySelector(`#delete-${catSponsorshipId}`)
    deleteButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const reqObj =  {
            method: 'DELETE'
        }
        fetch(`${catBreedSponsorshipsUrl}/${id}`, reqObj)
        const thisLi = document.querySelector(`#cat_breed_li-${id}`)
        thisLi.remove()
    })
}


