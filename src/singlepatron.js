
function renderSinglePatron(patron){
    const patronDetailDiv = document.querySelector('#patron-detail')
    const patronDeets = `
    <h3>${patron.name}</h3><br>

    <h5>Cat Sponsorships</h5>
    <br>
        <button type="button" id="add-cbs-button" class="btn btn-secondary">Add Cat Sponsorship</button>
        <br>
        <div id="new-cb-spons">
        </div>
        <br>
        <br>
        <ul id="patron-catbreed-sponsorships">
        </ul>
    <br>
    <h5>Accessory Sponsorships</h5>
         <br>
        <button type="button" id="add-accs-button"class="btn btn-secondary">Add Accessory Sponsorship</button>
        <br>
        <div id="new-accs-spons">
        </div>
        <br>
        <br>
        <ul id="patron-accs-sponsorships">
        </ul>
    <br>
    `
    patronDetailDiv.innerHTML = patronDeets

    addnewCBSButton(patron.id)
    renderCatBreedSponsorships(patron)
    addnewAccsSButton(patron.id)
    renderAccessorySponsorships(patron)
}



