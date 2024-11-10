document.addEventListener("DOMContentLoaded", function () {
    const selectedBeverage = sessionStorage.getItem("selectedBeverage");
    if (selectedBeverage) {
        editBeverage(selectedBeverage);
    } else {
        showMessage("No beverage selected!", "text-danger");
    }
});

function showMessage(message, className) {
    const messageElement = document.getElementById("editMessage");
    messageElement.textContent = message;
    messageElement.className = className;
}

// Name validation
const nameInput = document.getElementById("editName");
nameInput.addEventListener("input", function () {
    const nameError = document.getElementById("nameError");
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required";
    } else if (nameInput.value.length > 200) {
        nameError.textContent = "Name should be 200 characters max";
        nameInput.value = nameInput.value.slice(0, 200);
    } else {
        nameError.textContent = "";
    }
});

// Image URL validation
const imageInput = document.getElementById("editImage");
imageInput.addEventListener("input", function () {
    const imageError = document.getElementById("imageError");
    const imagePreview = document.getElementById("imagePreview");

    if (imageInput.value.trim() === "") {
        imageError.textContent = "Please select an image";
        imagePreview.style.display = "none";
        return;
    } else {
        imageError.textContent = "";
    }

    const img = new Image();
    img.src = imageInput.value;

    img.onload = function () {
        imagePreview.src = img.src;
        imagePreview.style.display = "block";
        imageError.textContent = "";
    };

    img.onerror = function () {
        imageError.textContent =
            "Image URL is not valid. Please select another URL!";
        imageInput.value = "";
        imagePreview.style.display = "none";
    };
});

// Price validation
const priceInput = document.getElementById("editPrice");
priceInput.addEventListener("input", function () {
    const priceError = document.getElementById("priceError");
    const priceValue = parseFloat(priceInput.value);

    if (isNaN(priceValue) || priceValue < 1 || priceValue > 999999999.99) {
        priceError.textContent = "Price must be between 1 and 999999999.99";
        priceInput.value = "";
    } else {
        priceError.textContent = "";
    }
});

// Description validation
const descriptionInput = document.getElementById("editDescription");
descriptionInput.addEventListener("input", function () {
    const descriptionError = document.getElementById("descriptionError");
    if (descriptionInput.value.trim() === "") {
        descriptionError.textContent = "Description is required";
    } else if (descriptionInput.value.length > 500) {
        descriptionError.textContent =
            "Description should be 500 characters max";
        descriptionInput.value = descriptionInput.value.slice(0, 500);
    } else {
        descriptionError.textContent = "";
    }
});

// Rating validation
const ratingInput = document.getElementById("editRating");
ratingInput.addEventListener("input", function () {
    const ratingError = document.getElementById("ratingError");
    const ratingValue = parseFloat(ratingInput.value);

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        ratingError.textContent = "Rating must be between 1 and 5";
        ratingInput.value = "";
    } else {
        ratingError.textContent = "";
    }
});

// Quantity validation
const quantityInput = document.getElementById("editQuantity");
quantityInput.addEventListener("input", function () {
    const quantityError = document.getElementById("quantityError");
    const quantityValue = parseInt(quantityInput.value, 10);

    if (isNaN(quantityValue) || quantityValue < 1 || quantityValue > 1000) {
        quantityError.textContent =
            "Quantity must be an integer between 1 and 1000";
        quantityInput.value = "";
    } else {
        quantityError.textContent = "";
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

function updateBeverage(id) {
    const jsonData = {
        name: document.getElementById("editName").value.trim(),
        image: document.getElementById("editImage").value.trim(),
        price: document.getElementById("editPrice").value,
        category: document.getElementById("editCategory").value,
        description: document.getElementById("editDescription").value.trim(),
        rating: document.getElementById("editRating").value,
        quantity: document.getElementById("editQuantity").value,
    };

    if (Object.values(jsonData).some((value) => value === "")) {
        showMessage("All fields are required!", "text-danger");
        return;
    }

    const request = new XMLHttpRequest();
    request.open("PUT", `/edit-beverage/${id}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        try {
            const response = JSON.parse(request.responseText);
            if (response.message === "Beverage updated successfully") {
                sessionStorage.setItem(
                    "successMessage",
                    `Edited beverage: ${jsonData.name} successfully!`
                );
                window.location.href = "index.html";
            } else {
                showMessage("Unable to edit beverage!", "text-danger");
            }
        } catch (error) {
            console.error("Error parsing response:", error);
            showMessage("An error occurred!", "text-danger");
        }
    };
    request.onerror = function () {
        showMessage("Network error!", "text-danger");
    };
    request.send(JSON.stringify(jsonData));
}
