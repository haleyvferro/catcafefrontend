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
    // patronsList.innerHTML = ``
    //grab the list
    //for each patron, 
        //we want to ad an li (innerHTL)
        //add id to each LI
        //show that on the page

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
    
    // patronNameHeader.innerText = patron.name
    // const patronCatBreedHeader = document.createElement('h4')


    //show patron name
    //show patron catbreed sponsorships
    //show patron accessory sponsorships
}



main()