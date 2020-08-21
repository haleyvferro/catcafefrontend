

// RENDER NEW CAT SPONSORSHIP FORM
function addnewCBSButton(patronId){

    const newCBSContainer = document.querySelector("#new-cb-spons");
    const formHolder = document.createElement('div')
    formHolder.innerHTML = `
        <form i>
        <label for="breed">Cat Breed:</label>
        <select name="Cat Breeds" id="cat-breeds-select"></select>
        <br>
        <label for="amount">Amount:</label>
        <input type="integer"></input>
        <button type="submit" name="submit" id="cbs-submit" class="btn btn-dark">Add Sponsorship</button>
        </form>
    `
    newCBSContainer.append(formHolder)
    newCBSContainer.style.display = "none";
    let addCBS = false;
    addBtn = document.querySelector('#add-cbs-button')

    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      const form = document.querySelector('#new-cb-spons')
      addCBS = !addCBS;
      if (addCBS) {
        form.style.display = "block";
      } else {
        form.style.display = "none";
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


// ADD BUTTON AND FORM TO ADD NEW CAT SPONSORSHIP
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
        
        //ADD ELEMENT TO END
        fetch(catBreedSponsorshipsUrl, reqObj)
        .then(resp => resp.json())
        .then(cbSponso => {
            const catBreedSponsorshipsList = document.querySelector('#patron-catbreed-sponsorships')
            const breed = event.target.parentNode.children[1].value.split(' - ').pop()
            const catBreedLi = document.createElement('li')
            catBreedLi.className = "list-group-item"
            catBreedLi.innerHTML = `
            <p>${breed}   Sponsorship Amount:  $<input id="cat_breed_amount" value=${amount}></input></p><br>
            <p><button data-id="${cbSponso.id}" id="update-button-${cbSponso.id}" class="btn btn-dark">Update Sponsorship Amount</button> <button data-id="${cbSponso.id}" id="delete-${cbSponso.id}" class="btn btn-dark">Delete Sponsorship</button>
            `
            catBreedLi.id = `cat_breed_li-${cbSponso.id}`
            catBreedSponsorshipsList.append(catBreedLi)
        })
        cbsForm.parentNode.remove()
        addnewCBSButton(patronId)
    })
}


// CREATE LIST FOR NEW SPONS DROPDOWN
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
        catBreedLi.className = "list-group-item"
        catBreedLi.innerHTML = `
        <p>${cat_breed.cat_breed}   Sponsorship Amount:  $<input id="cat_breed_amount" value=${cat_breed.amount}></input></p><br>
        <p><button data-id="${cat_breed.cat_breed_sponsorship_id}" id="update-button-${cat_breed.cat_breed_sponsorship_id}" class="btn btn-dark">Update Sponsorship Amount</button> <button data-id="${cat_breed.cat_breed_sponsorship_id}" id="delete-${cat_breed.cat_breed_sponsorship_id}" class="btn btn-dark">Delete Sponsorship</button>
        `
        catBreedLi.id = `cat_breed_li-${cat_breed.cat_breed_sponsorship_id}`
        catBreedSponsorshipsList.append(catBreedLi)
        catSponsAmtUpdate(patron, `${cat_breed.cat_breed_sponsorship_id}`)
        catSponsDelete(patron, `${cat_breed.cat_breed_sponsorship_id}`)
    })
}




// CAT SPONSORSHIP AMOUNT UPDATE BUTTON
function catSponsAmtUpdate(patron, catSponsorshipId){
    const updateButton = document.querySelector(`#update-button-${catSponsorshipId}`)
    updateButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const currentAmount = document.querySelector(`#cat_breed_li-${catSponsorshipId}`).childNodes[1].childNodes[1].value
        const reqObj =  {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: currentAmount })
        }
        fetch(`${catBreedSponsorshipsUrl}/${id}`, reqObj)
        .then(resp => resp.json())
        .then(resp => {
            alert("amount updated");
            const amount = document.querySelector(`#cat_breed_li-${catSponsorshipId}`).childNodes[1].childNodes[1]
            amount.value = resp.amount
        })
        const catBreedSponsorshipsList = document.querySelector('#patron-catbreed-sponsorships')
        catBreedSponsorshipsList.innerText = "";
        renderCatBreedSponsorships(patron)
    })
}


//   CAT SPONSORSHIP DELETE BUTTON
function catSponsDelete(patron, catSponsorshipId){
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


