document.addEventListener("DOMContentLoaded", function () {
    const selectedBeverage = sessionStorage.getItem("selectedBeverage");
    if (selectedBeverage) {
        editBeverage(selectedBeverage);
    }
});

function editBeverage(data) {
    const selectedBeverage = JSON.parse(data);
    document.getElementById("editName").value = selectedBeverage.name;
    document.getElementById("editImage").value = selectedBeverage.image;
    document.getElementById("editPrice").value = selectedBeverage.price;
    document.getElementById("editCategory").value = selectedBeverage.category;
    document.getElementById("editDescription").value =
        selectedBeverage.description;
    document.getElementById("editRating").value = selectedBeverage.rating;
    document.getElementById("editQuantity").value = selectedBeverage.quantity;

    document.getElementById("updateButton").onclick = function () {
        updateBeverage(selectedBeverage.id);
    };
}

// function updateBeverage(id) {
//     const jsonData = {
//         name: document.getElementById("editName").value,
//         image: document.getElementById("editImage").value,
//         price: document.getElementById("editPrice").value,
//         category: document.getElementById("editCategory").value,
//         description: document.getElementById("editDescription").value,
//         rating: document.getElementById("editRating").value,
//         quantity: document.getElementById("editQuantity").value,
//     };

//     if (Object.values(jsonData).some((value) => value === "")) {
//         document.getElementById("editMessage").textContent =
//             "All fields are required!";
//         document.getElementById("editMessage").className = "text-danger";
//         return;
//     }

//     const request = new XMLHttpRequest();
//     request.open("PUT", `/edit-beverage/${id}`, true);
//     request.setRequestHeader("Content-Type", "application/json");
//     request.onload = function () {
//         const response = JSON.parse(request.responseText);
//         const messageElement = document.getElementById("editMessage");
//         if (response.message === "beverage modified successfully!") {
//             messageElement.textContent = `Edited beverage: ${jsonData.name}!`;
//             messageElement.className = "text-success";
//             window.location.href = "index.html";
//         } else {
//             messageElement.textContent = "Unable to edit beverage!";
//             messageElement.className = "text-danger";
//         }
//     };
//     request.send(JSON.stringify(jsonData));
// }

function updateBeverage(id) {
    const jsonData = {
        name: document.getElementById("editName").value,
        image: document.getElementById("editImage").value,
        price: document.getElementById("editPrice").value,
        category: document.getElementById("editCategory").value,
        description: document.getElementById("editDescription").value,
        rating: document.getElementById("editRating").value,
        quantity: document.getElementById("editQuantity").value,
    };

    if (Object.values(jsonData).some((value) => value === "")) {
        document.getElementById("editMessage").textContent =
            "All fields are required!";
        document.getElementById("editMessage").className = "text-danger";
        return;
    }

    const request = new XMLHttpRequest();
    request.open("PUT", `/edit-beverage/${id}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        // Log the entire response for debugging
        console.log("Response:", request.responseText);

        try {
            const response = JSON.parse(request.responseText);
            const messageElement = document.getElementById("editMessage");
            if (response.message === "Beverage updated successfully") {
                sessionStorage.setItem(
                    "successMessage",
                    `Edited beverage: ${jsonData.name} successfully!`
                );
                window.location.href = "index.html"; // Redirect to index.html
            } else {
                messageElement.textContent = "Unable to edit beverage!";
                messageElement.className = "text-danger";
            }
        } catch (error) {
            console.error("Error parsing response:", error);
            document.getElementById("editMessage").textContent =
                "An error occurred!";
            document.getElementById("editMessage").className = "text-danger";
        }
    };
    request.onerror = function () {
        document.getElementById("editMessage").textContent = "Network error!";
        document.getElementById("editMessage").className = "text-danger";
    };
    request.send(JSON.stringify(jsonData));
}
