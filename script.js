const infoData = {
    "Merk 1": { "Smaak 1 merk 1": 15, "Smaak 2 merk 1": 15 },
    "Merk 2": { "Smaak 1 merk 2": 20, "Smaak 2 merk 2": 20 },
    "Merk 3": { "Smaak 1 merk 3": 30, "Smaak 2 merk 3": 30 },
};

        window.onload = function() {
        alert("Let op: Deze website is alleen voor informatieve doeleinden en verkoopt geen producten.");
        };



        function generateProductList() {
            const tableBody = document.getElementById('product-table');
            tableBody.innerHTML = '';
            
            for (const [merk, smaken] of Object.entries(infoData)) {
                for (const [smaak, prijs] of Object.entries(smaken)) {
                    tableBody.innerHTML += `<tr><td>${merk}</td><td>${smaak}</td><td>€${prijs}</td></tr>`;
                }
            }
        }

        function updateFlavors(selectElement) {
            const merk = selectElement.value;
            const flavorSelect = selectElement.closest('.product-group').querySelector('.flavor-select');
            flavorSelect.innerHTML = '';

            if (merk && infoData[merk]) {
                for (const smaak of Object.keys(infoData[merk])) {
                    flavorSelect.innerHTML += `<option value="${smaak}">${smaak}</option>`;
                }
            }
        }

        function updateProductFields() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';
            
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
                    <select class="flavor-select" id="product${i}" name="product${i}" required></select>
                `;
                
                productContainer.appendChild(productGroup);
            }
        }

        window.onload = function () {
            generateProductList();
            updateProductFields();
        };

        // Voeg een variabele toe om de totaalprijs bij te houden
        let totalPrice = 0;

        function updateFlavors(selectElement) {
            const merk = selectElement.value;
            const flavorSelect = selectElement.closest('.product-group').querySelector('.flavor-select');
            flavorSelect.innerHTML = '';

            if (merk && infoData[merk]) {
                for (const smaak of Object.keys(infoData[merk])) {
                    flavorSelect.innerHTML += `<option value="${smaak}">${smaak}</option>`;
                }
            }

            // Update de prijs
            updateTotalPrice();
        }

        function updateTotalPrice() {
            totalPrice = 0;

            // Doorloop alle geselecteerde producten en voeg de prijs toe
            const productGroups = document.querySelectorAll('.product-group');
            productGroups.forEach(group => {
                const merk = group.querySelector('.brand-select').value;
                const smaak = group.querySelector('.flavor-select').value;

                if (merk && smaak) {
                    totalPrice += infoData[merk][smaak];
                }
            });

            // Toon de totaalprijs boven de knop
            document.getElementById('total-price').innerText = `Totale prijs: €${totalPrice}`;
        }

        function updateProductFields() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

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
                    <select class="flavor-select" id="product${i}" name="product${i}" required onchange="updateTotalPrice()"></select>
                `;

                productContainer.appendChild(productGroup);
            }

            // Reset de totaalprijs na het veranderen van het aantal
            updateTotalPrice();
            
        }
