function viewBeverage() {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/view-beverage", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = "";

        response.forEach(function (beverage) {
            html += `
                <div class="card">
                    <h2 class="card-title">${beverage.name}</h2>
                    <img src="${beverage.image}" alt="./images/noimage.png" class="card-image">
                    <p class="card-description">${beverage.description}</p>
                    <p class="card-price">Price: $${beverage.price}</p>
                    <p class="card-category">Category: ${beverage.category}</p>
                    <p class="card-quantity">Quantity: ${beverage.quantity}</p>
                    <div class="card-rating">Rating: ${beverage.rating}</div>
                </div>
            `;
        });

        document.querySelector(".card-container").innerHTML = html;
    };

    request.onerror = function () {
        console.error("Error loading beverages");
    };

    request.send();
}
