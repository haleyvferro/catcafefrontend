//code here

patronsUrl = "http://localhost:3000/patrons"

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
}



function renderCatBreedSponsorships(patron){
    const catBreedSponsorshipsList = document.querySelector('#patron-catbreed-sponsorships')
    console.log(patron.id)
    //fetch sponsorship information (backend - serializer)
    //      when it comes back, we could filter through and find any that 
    //      have the same patron_id as our patron here?
    //      if so, we need to get cats here
}



//Patron
//----
//cat breed sponsos
//  cat breed name - <textfield>amont</textfield> 
//  <btton - patch> <btton delete>

//accessories sponsos
// accessory nae - <textfield>amont</textfield> 
//  <btton - patch> <btton delete>

//create new sponso for this patron
//patron, dropdown - catbreed/accessory, aont - <sbit>



main()