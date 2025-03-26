const infoData = {
    "RandM Tornado 15k": { "Apple Peach Pear": 15, "Blue Razz Cherry": 15 },
    "RandM Tornado 30k": { "Love 66": 20, "Lush Ice": 20 },
    "JNR MediaMax 40k": { "Blue Razz Ice": 30, "Mixed Berry": 30 },
};

function generateProductList() {
    const container = document.getElementById("product-container");
    container.innerHTML = '';

    Object.entries(infoData).forEach(([merk, smaken]) => {
        Object.entries(smaken).forEach(([smaak, prijs]) => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `<h3>${merk}</h3><p>${smaak}</p><p>€${prijs}</p>`;
            container.appendChild(card);
        });
    });
}

function updateProductFields() {
    const quantity = document.getElementById('quantity').value;
    const selectionContainer = document.getElementById('product-selection');
    selectionContainer.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        const select = document.createElement("select");
        select.innerHTML = Object.keys(infoData).map(merk => `<option value="${merk}">${merk}</option>`).join('');
        selectionContainer.appendChild(select);
    }
}

window.onload = generateProductList;
