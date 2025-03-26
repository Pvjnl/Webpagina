// Productdata (merk -> smaken & prijzen)
const products = {
    "RandM Tornado 15k": {
        "Apple Peach Pear": 15,
        "Blue Razz Cherry": 15,
        "Cherry": 15
    },
    "RandM Tornado 30k": {
        "Love 66": 20,
        "Lush Ice": 20
    },
    "JNR MediaMax 40k": {
        "Blue Razz Ice": 30,
        "Mixed Berry": 30
    }
};

// Genereer de productlijst
function generateProductList() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Leeg de container

    Object.entries(products).forEach(([merk, smaken]) => {
        const merkDiv = document.createElement('div');
        merkDiv.classList.add('product-brand');

        // Merkknop
        const merkButton = document.createElement('button');
        merkButton.classList.add('toggle-button');
        merkButton.textContent = merk;
        merkButton.onclick = () => toggleVisibility(merkDiv);

        // Smakenlijst (verborgen)
        const smakenList = document.createElement('ul');
        smakenList.classList.add('smaken-lijst');
        smakenList.style.display = 'none';

        Object.entries(smaken).forEach(([smaak, prijs]) => {
            const smaakItem = document.createElement('li');
            smaakItem.textContent = `${smaak} - €${prijs}`;
            smakenList.appendChild(smaakItem);
        });

        // Voeg toe aan de DOM
        merkDiv.appendChild(merkButton);
        merkDiv.appendChild(smakenList);
        container.appendChild(merkDiv);
    });
}

// Toon/verberg smaken bij klikken op merk
function toggleVisibility(merkDiv) {
    const smakenList = merkDiv.querySelector('.smaken-lijst');
    smakenList.style.display = smakenList.style.display === 'none' ? 'block' : 'none';
}

// Start de productlijst
window.onload = generateProductList;
