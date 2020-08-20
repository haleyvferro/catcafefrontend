

function fetchAccs(){
    fetch(accsUrl)
    .then(data => data.json())
    .then(accs => {
        renderAccs(accs)
    })
}

function renderAccs(accs){
    const accsListContainer = document.querySelector("#accs-list")
    accs.forEach(accs => {
        const accsLi = document.createElement('li')
        accsLi.dataset.id = accs.id
        accsLi.innerText = accs.name
        accsListContainer.append(accsLi)
        createAccsClickListener(accsLi)
    })
}

function createAccsClickListener(accsLi){
    accsLi.addEventListener('click', function(event){
        const accsId = accsLi.dataset.id

        fetch(`${accsUrl}/${accsId}`)
        .then(data => data.json())
        .then(accs => {
            renderSingleAccs(accs)
        })
    })
}

