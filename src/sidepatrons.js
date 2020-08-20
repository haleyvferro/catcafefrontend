

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
        patronLi.className = "list-group-item"
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

