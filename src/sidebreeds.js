

function fetchBreeds(){
    fetch(catBreedssUrl)
    .then(data => data.json())
    .then(breed => {
        renderCBs(breed)
    })
}

function renderCBs(breed){
    const cbListContainer = document.querySelector("#cat-breeds-list")
    breeds.forEach(breed => {
        const breedLi = document.createElement('li')
        breedLi.dataset.id = breed.id
        breedLi.innerText = breed.name
        cbListContainer.append(breedLi)
        createBreedClickListener(breedLi)
    })
}

function createCBClickListener(breedLi){
    breedLi.addEventListener('click', function(event){
        const breedId = breedLi.dataset.id

        fetch(`${catBreedsUrl}/${breedId}`)
        .then(data => data.json())
        .then(breed => {
            renderSinglebreed(breed)
        })
    })
}

