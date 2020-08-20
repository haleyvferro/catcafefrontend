
function renderSinglePatron(patron){
    const patronDetailDiv = document.querySelector('#patron-detail')
    const patronDeets = `
    <h3>${patron.name}</h3><br>

    <h5>Cat Sponsorships</h5>
    <br>
        <button type="button" id="add-cbs-button">Add Cat Sponsorship</button>
        <br>
        <div id="new-cb-spons">
        </div>
        <br>
        <br>
        <ul id="patron-catbreed-sponsorships">
        </ul>
    <br>
    <h4>Accessory Sponsorships</h4>
        <div id="new-accs-spons">
        <ul id="patron-accessory-sponsorships">
        </ul>
        </div>
    `
    patronDetailDiv.innerHTML = patronDeets

    addnewCBSButton()
    renderCatBreedSponsorships(patron)
    renderAccessorySponsorships(patron)
    fetchCatBreeds()
}




// NEW CAT SPONSORSHIP FORM
function addnewCBSButton(){

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
    let addCBS = true;

    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      const form = document.querySelector('#add-cbs-form')
      addCBS = !addCBS;
      if (addCBS) {
        formHolder.style.display = "block";
      } else {
        formHolder.style.display = "none";
      }
    })
    addCBSSubmit()
}



function fetchCatBreeds(){
    fetch(`${catBreedsUrl}`)
    .then(data => data.json())
    .then(catBreeds => {renderCatBreedList(catBreeds)})
}


function addCBSSubmit(){
    const cbsForm = document.querySelector('.add-cbs-form')
    cbsForm.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event)
    })

    //scrape the data from the form
    //send to the backend
    //then show on the front end
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



function renderCatBreedList(catBreeds){
    const catBreedSelect = document.querySelector('#cat-breeds-select')
    catBreeds.forEach(catBreed => {
        const catBreedOption = document.createElement("option")
        catBreedOption.innerText = catBreed.name
        catBreedSelect.append(catBreedOption)
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



// ACCESSORY SPONSORSHIP LIST
function renderAccessorySponsorships(patron){
    const accessorySponsorshipsList = document.querySelector('#patron-accessory-sponsorships')
    patron.accessory_sponsorships.forEach(accessory => {
        const accessoryLi = document.createElement('li')
        accessoryLi.innerHTML = `
        <p>${accessory.accessory}   Sponsorship Amount:  $<textarea id="accessory_amount">${accessory.amount}</textarea></p><br>
        <p><button data-id="${accessory.accessory_sponsorship_id}" id="update-button-${accessory.accessory_sponsorship_id}">Update Sponsorship Amount</button><button data-id="${accessory.accessory_sponsorship_id}" id="delete-${accessory.accessory_sponsorship_id}">Delete Sponsorship</button>
        `
        accessoryLi.id = `accs_li-${accessory.accessory_sponsorship_id}`
        accessorySponsorshipsList.append(accessoryLi)
        accsSponsAmtUpdate(`${accessory.accessory_sponsorship_id}`)
        accsSponsDelete(`${accessory.accessory_sponsorship_id}`)
    })
}

// ACCESSORY SPONSORSHIP AMOUNT UPDATE BUTTON
function accsSponsAmtUpdate(accsSponsorshipId){
    const updateButton = document.querySelector(`#update-button-${accsSponsorshipId}`)
    updateButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const currentAmount = document.querySelector('#accessory_amount').value
        const reqObj =  {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: currentAmount })
        }
        fetch(`${accsSponsorshipsUrl}/${id}`, reqObj)
    })
}

// ACCESSORY SPONSORSHIP DELETE BUTTON
function accsSponsDelete(accsSponsorshipId){
    const deleteButton = document.querySelector(`#delete-${accsSponsorshipId}`)
    deleteButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const reqObj =  {
            method: 'DELETE'
        }
        fetch(`${accsSponsorshipsUrl}/${id}`, reqObj)
        const thisLi = document.querySelector(`#accs_li-${id}`)
        thisLi.remove()
    })
}
