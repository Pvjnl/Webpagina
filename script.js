const infoData = {
    "Merk 1": { "Smaak 1 merk 1": 15, "Smaak 2 merk 1": 15 },
    "Merk 2": { "Smaak 1 merk 2": 20, "Smaak 2 merk 2": 20 },
    "Merk 3": { "Smaak 1 merk 3": 30, "Smaak 2 merk 3": 30 },
};

// 🚀 Zorg ervoor dat de velden juist worden weergegeven bij het laden van de pagina
// window.onload = function() {
//     alert("Let op: Deze website is alleen voor informatieve doeleinden en verkoopt geen producten.");
//     updateProductFields();
// };

function updateFlavors(selectElement) {
    const merk = selectElement.value;
    const flavorSelect = selectElement.closest('.product-group').querySelector('.flavor-select');
    flavorSelect.innerHTML = '<option value="">Kies een smaak</option>';

    if (merk && infoData[merk]) {
        for (const [smaak, prijs] of Object.entries(infoData[merk])) {
            flavorSelect.innerHTML += `<option value="${smaak}" data-price="${prijs}">${smaak}</option>`;
        }
    }

    updateTotalPrice();
}

function updateProductFields() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productSelection = document.getElementById('product-selection');
    productSelection.innerHTML = '';

    for (let i = 1; i <= quantity; i++) {
        const productGroup = document.createElement('div');
        productGroup.classList.add('product-group');
        productGroup.innerHTML = `
            <label for="brand${i}">Merk voor product ${i}:</label>
            <select class="brand-select" id="brand${i}" name="brand${i}" required onchange="updateFlavors(this)">
                <option value="">Kies een merk</option>
                ${Object.keys(infoData).map(merk => `<option value="${merk}">${merk}</option>`).join('')}
            </select>

            <label for="product${i}">Smaak voor product ${i}:</label>
            <select class="flavor-select" id="product${i}" name="product${i}" required onchange="updateTotalPrice()">
                <option value="">Kies een smaak</option>
            </select>
        `;

        productSelection.appendChild(productGroup);
    }

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('.product-group').forEach(group => {
        const merk = group.querySelector('.brand-select').value;
        const smaakSelect = group.querySelector('.flavor-select');
        const smaak = smaakSelect.value;
        if (merk && smaak) {
            totalPrice += infoData[merk][smaak];
        }
    });

    document.getElementById('total-price').innerText = `Totale prijs: €${totalPrice}`;
}

// 🚀 Formulier voorkomt per ongeluk verzenden als er nog lege velden zijn
document.querySelector("form").onsubmit = function(event) {
    if (document.querySelectorAll('.brand-select').length === 0) {
        event.preventDefault();
        alert("Je moet minstens één product kiezen voordat je kunt bestellen!");
    }
};
