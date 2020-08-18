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
    })
    // patronsList.innerHTML = ``
    //grab the list
    //for each patron, 
        //we want to ad an li (innerHTL)
        //add id to each LI
        //show that on the page

}





main()