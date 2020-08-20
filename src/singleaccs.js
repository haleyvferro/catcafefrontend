

// NEW CAT SPONSORSHIP FORM
function addnewAccsSButton(patronId){

    const newAccsContainer = document.querySelector("#new-accs-spons");
    const formHolder = document.createElement('div')
    formHolder.innerHTML = `
        <form class="add-accs-form">
        <label for="accs">Accessory:</label>
        <select name="Accessories" id="accs-select"></select>
        <br>
        <label for="amount">Amount:</label>
        <input type="integer"></input>
        <button type="submit" name="submit" id="accs-submit">Add Sponsorship</button>
        </form>
    `
    newAccsContainer.append(formHolder)
    addBtn = document.querySelector('#add-accs-button')

    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      let addAccs = false;
      const form = document.querySelector('#add-accs-form')
      addAccs = !addAccs;
      if (addAccs) {
        formHolder.style.display = "block";
      } else {
        formHolder.style.display = "none";
      }
    })
    fetchAccs()
    addAccsSubmit(patronId)
}


function fetchAccs(){
    fetch(`${accsUrl}`)
    .then(data => data.json())
    .then(accessories => {renderAccsList(accessories)})
}


function addAccsSubmit(patronId){
    const accsForm = document.querySelector('#accs-submit')
    accsForm.addEventListener('click', (event) => {
        event.preventDefault()
        const accsId = parseInt(event.target.parentNode.children[1].value)
        const amount = parseInt(event.target.parentNode.children[4].value)

        const reqObj = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',
                        'Accept' : 'application/json'},
            body: JSON.stringify({ amount: amount, patron_id: patronId, accessory_id: accsId })
        }
        
        fetch(accsSponsorshipsUrl, reqObj)
        .then(resp => resp.json())
        .then(accsSponso => {
            const accsSponsorshipsList = document.querySelector('#patron-accs-sponsorships')
            const accs = event.target.parentNode.children[1].value.split(' - ').pop()
            const accsLi = document.createElement('li')
            accsLi.innerHTML = `
            <p>${accs}   Sponsorship Amount:  $<textarea id="accs_amount">${amount}</textarea></p><br>
            <p><button data-id="${accsSponso.id}" id="update-button-${accsSponso.id}">Update Sponsorship Amount</button><button data-id="${accsSponso.id}" id="delete-${accsSponso.id}">Delete Sponsorship</button>
            `
            accsLi.id = `accs_li-${accsSponso.id}`
            accsSponsorshipsList.append(accsLi)
        })
        accsForm.parentNode.remove()
        addnewAccsSButton(patronId)
    })
}

function renderAccsList(accessories){
    const accsSelect = document.querySelector('#accs-select')
    accessories.forEach(accs => {
        const accsOption = document.createElement("option")
        accsOption.innerText = `${accs.id} - ${accs.name}`
        accsSelect.append(accsOption)
    })
}



// ACCESSORY SPONSORSHIP LIST
function renderAccessorySponsorships(patron){
    const accessorySponsorshipsList = document.querySelector('#patron-accs-sponsorships')
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
