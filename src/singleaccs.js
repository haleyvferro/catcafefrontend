

// RENDER NEW ACCESORY SPONSORSHIP FORM
function addnewAccsSButton(patron){

    const newAccsContainer = document.querySelector("#new-accs-spons");
    const formHolder = document.createElement('div')
    formHolder.innerHTML = `
        <form i>
        <label for="accs">Accessory:</label>
        <select name="Accessories" id="accs-select"></select>
        <br>
        <label for="amount">Amount:</label>
        <input type="integer"></input>
        <button type="submit" name="submit" id="accs-submit" class="btn btn-dark">Add Sponsorship</button>
        </form>
    `
    newAccsContainer.append(formHolder)
    newAccsContainer.style.display = "none";
    let addAccs = false;
    addBtn = document.querySelector('#add-accs-button')

    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      const form = document.querySelector('#new-accs-spons')
      addAccs = !addAccs;
      if (addAccs) {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    })
    fetchAccs()
    addAccsSubmit(patron)
}

function fetchAccs(){
    fetch(`${accsUrl}`)
    .then(data => data.json())
    .then(accs => {renderAccsList(accs)})
}


// ADD BUTTON AND FORM TO ADD NEW ACCESSORY SPONSORSHIP
function addAccsSubmit(patron){
    const accsForm = document.querySelector('#accs-submit')
    accsForm.addEventListener('click', (event) => {
        event.preventDefault()
        const accsId = parseInt(event.target.parentNode.children[1].value)
        const amount = parseInt(event.target.parentNode.children[4].value)

        const reqObj = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: amount, patron_id: patron.id, accessory_id: accsId })
        }
        
        //ADD ELEMENT TO END
        fetch(accsSponsorshipsUrl, reqObj)
        .then(resp => resp.json())
        .then(accsponso => {
            const accsSponsorshipsList = document.querySelector('#patron-accs-sponsorships')
            const accs = event.target.parentNode.children[1].value.split(' - ').pop()
            const accsLi = document.createElement('li')
            accsLi.className = "list-group-item"
            accsLi.innerHTML = `
            <p>${accs}   Sponsorship Amount:  $<input id="accs_amount" value=${amount}></input></p><br>
            <p><button data-id="${accsponso.id}" id="update-button-${accsponso.id}" class="btn btn-dark">Update Sponsorship Amount</button> <button data-id="${accsponso.id}" id="delete-${accsponso.id}" class="btn btn-dark">Delete Sponsorship</button>
            `
            accsLi.id = `accs_li-${accsponso.id}`
            accsSponsorshipsList.append(accsLi)
            accsSponsAmtUpdate(patron, accsponso.id)
            accsSponsDelete(patron, accsponso.id)
        })
        accsForm.parentNode.remove()
        addnewAccsSButton(patron)
    })
}


// CREATE LIST FOR NEW SPONS DROPDOWN
function renderAccsList(accs){
    const accsSelect = document.querySelector('#accs-select')
    accs.forEach(accs => {
        const accsOption = document.createElement("option")
        accsOption.innerText = `${accs.id} - ${accs.name}`
        accsSelect.append(accsOption)
    })
}


// RENDER ACCESSORY SPONSORSHIP LIST
function renderAccsSponsorships(patron){
    const accsSponsorshipsList = document.querySelector('#patron-accs-sponsorships')
    patron.accessory_sponsorships.forEach(accs => {
        const accsLi = document.createElement('li')
        accsLi.className = "list-group-item"
        accsLi.innerHTML = `
        <p>${accs.accessory}   Sponsorship Amount:  $<input id="accs_amount" value=${accs.amount}></input></p><br>
        <p><button data-id="${accs.accessory_sponsorship_id}" id="update-button-${accs.accessory_sponsorship_id}" class="btn btn-dark">Update Sponsorship Amount</button> <button data-id="${accs.accessory_sponsorship_id}" id="delete-${accs.accessory_sponsorship_id}" class="btn btn-dark">Delete Sponsorship</button>
        `
        accsLi.id = `accs_li-${accs.accessory_sponsorship_id}`
        accsSponsorshipsList.append(accsLi)
        accsSponsAmtUpdate(patron, `${accs.accessory_sponsorship_id}`)
        accsSponsDelete(patron, `${accs.accessory_sponsorship_id}`)
    })
}




// ACCESSORY SPONSORSHIP AMOUNT UPDATE BUTTON
function accsSponsAmtUpdate(patron, accsSponsorshipId){
    const updateButton = document.querySelector(`#update-button-${accsSponsorshipId}`)
    updateButton.addEventListener('click', function(event){
        const id = event.target.dataset.id
        const currentAmount = document.querySelector(`#accs_li-${accsSponsorshipId}`).childNodes[1].childNodes[1].value
        const reqObj =  {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: currentAmount })
        }
        fetch(`${accsSponsorshipsUrl}/${id}`, reqObj)
        .then(resp => resp.json())
        .then(resp => {
            alert("amount updated");
            const amount = document.querySelector(`#accs_li-${accsSponsorshipId}`).childNodes[1].childNodes[1]
            amount.value = resp.amount
        })
    })
}


//   ACCESSORY SPONSORSHIP DELETE BUTTON
function accsSponsDelete(patron, accsSponsorshipId){
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
