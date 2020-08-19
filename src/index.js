//code here

patronsUrl = "http://localhost:3000/patrons"
catBreedSponsorshipsUrl = "http://localhost:3000/cat_breed_sponsorships"
accsSponsorshipsUrl = "http://localhost:3000/accessory_sponsorships"


function main(){
fetchPatrons()
}


function fetchPatrons(){
    fetch(patronsUrl)
    .then(data => data.json())
    .then(patrons => {
        renderPatrons(patrons)
    })
}

function renderPatrons(patrons){
    const patronsListContainer = document.querySelector("#patrons-list")
    patrons.forEach(patron => {
        const patronLi = document.createElement('li')
        patronLi.dataset.id = patron.id
        patronLi.innerText = patron.name
        patronsListContainer.append(patronLi)
        createPatronClickListener(patronLi)
    })
}

function createPatronClickListener(patronLi){
    patronLi.addEventListener('click', function(event){
        const patronId = patronLi.dataset.id

        fetch(`${patronsUrl}/${patronId}`)
        .then(data => data.json())
        .then(patron => {
            renderSinglePatron(patron)
        })


    })
}

function renderSinglePatron(patron){
    const patronDetailDiv = document.querySelector('#patron-detail')
    const patronDeets = `
    <h3>${patron.name}</h3><br>
    <h4>Cat Breed Sponsorships</h4>
    <ul id="patron-catbreed-sponsorships">

    </ul>
    <h4>Accessory Sponsorships</h4>
    <ul id="patron-accessory-sponsorships">
    </ul>
    `
    patronDetailDiv.innerHTML = patronDeets

    renderCatBreedSponsorships(patron)
    renderAccessorySponsorships(patron)
}

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


//Patron

//create new sponso for this patron
//patron, dropdown - catbreed/accessory, aont - <sbit>

//delete buttons


main()
