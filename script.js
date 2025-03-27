const infoData = {
    "Merk 1": { "Smaak 1 merk 1": 15, "Smaak 2 merk 1": 15 },
    "Merk 2": { "Smaak 1 merk 2": 20, "Smaak 2 merk 2": 20 },
    "Merk 3": { "Smaak 1 merk 3": 30, "Smaak 2 merk 3": 30 },
    "Marlboro": { "Red": 5, "Slof": 45 },
};

// 🚀 Laad producten en update velden direct bij het openen van de pagina
document.addEventListener("DOMContentLoaded", function () {
    generateProductList();
    updateProductFields();
});

// 🚀 Genereer de productlijst en toon deze op de pagina
function generateProductList() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    for (const [merk, smaken] of Object.entries(infoData)) {
        const merkElement = document.createElement('div');
        merkElement.classList.add('merk');
        
        // Voeg Font Awesome pijl icoon toe naast het merk
        merkElement.innerHTML = `
            <h3>
                ${merk}
                <span class="arrow fas fa-chevron-down"></span> <!-- Font Awesome pijl toegevoegd -->
            </h3>
            <ul class="smaken-lijst" style="display: none;"></ul>
        `;
        productContainer.appendChild(merkElement);

        const smakenLijst = merkElement.querySelector('.smaken-lijst');
        const arrow = merkElement.querySelector('.arrow'); // Selecteer de pijl

        for (const [smaak, prijs] of Object.entries(smaken)) {
            smakenLijst.innerHTML += `<li>${smaak} - €${prijs}</li>`;
        }

        // Toggle functionaliteit om smaken te tonen/verbergen
        merkElement.querySelector('h3').addEventListener('click', function () {
            const isVisible = smakenLijst.style.display === "block";
            smakenLijst.style.display = isVisible ? "none" : "block"; // Verander zichtbaarheid
            arrow.classList.toggle('fa-chevron-down'); // Verander pijl naar beneden
            arrow.classList.toggle('fa-chevron-up');   // Verander pijl naar boven
        });
    }
}

// 🚀 Update de smakenlijst gebaseerd op het gekozen merk
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

// 🚀 Update het aantal productvelden op basis van de input
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

// 🚀 Bereken en toon de totaalprijs
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

// 🚀 Zorg ervoor dat het formulier niet verzonden wordt als het totaalbedrag te laag is
document.querySelector("form").onsubmit = function(event) {
    const totalPriceText = document.getElementById("total-price").innerText;
    const totalPrice = parseFloat(totalPriceText.replace("Totale prijs: €", ""));

    if (totalPrice < 15) {
        alert("Het minimale bestelbedrag is €15. Voeg meer producten toe om door te gaan.");
        event.preventDefault();
    }
};
