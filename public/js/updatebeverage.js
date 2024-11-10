// document.addEventListener("DOMContentLoaded", function () {
//     const selectedBeverage = sessionStorage.getItem("selectedBeverage");
//     if (selectedBeverage) {
//         editBeverage(selectedBeverage);
//     }
// });

// function editBeverage(data) {
//     const selectedBeverage = JSON.parse(data);
//     document.getElementById("editName").value = selectedBeverage.name;
//     document.getElementById("editImage").value = selectedBeverage.image;
//     document.getElementById("editPrice").value = selectedBeverage.price;
//     document.getElementById("editCategory").value = selectedBeverage.category;
//     document.getElementById("editDescription").value =
//         selectedBeverage.description;
//     document.getElementById("editRating").value = selectedBeverage.rating;
//     document.getElementById("editQuantity").value = selectedBeverage.quantity;

//     document.getElementById("updateButton").onclick = function () {
//         updateBeverage(selectedBeverage.id);
//     };
// }

// // function updateBeverage(id) {
// //     const jsonData = {
// //         name: document.getElementById("editName").value,
// //         image: document.getElementById("editImage").value,
// //         price: document.getElementById("editPrice").value,
// //         category: document.getElementById("editCategory").value,
// //         description: document.getElementById("editDescription").value,
// //         rating: document.getElementById("editRating").value,
// //         quantity: document.getElementById("editQuantity").value,
// //     };

// //     if (Object.values(jsonData).some((value) => value === "")) {
// //         document.getElementById("editMessage").textContent =
// //             "All fields are required!";
// //         document.getElementById("editMessage").className = "text-danger";
// //         return;
// //     }

// //     const request = new XMLHttpRequest();
// //     request.open("PUT", `/edit-beverage/${id}`, true);
// //     request.setRequestHeader("Content-Type", "application/json");
// //     request.onload = function () {
// //         const response = JSON.parse(request.responseText);
// //         const messageElement = document.getElementById("editMessage");
// //         if (response.message === "beverage modified successfully!") {
// //             messageElement.textContent = `Edited beverage: ${jsonData.name}!`;
// //             messageElement.className = "text-success";
// //             window.location.href = "index.html";
// //         } else {
// //             messageElement.textContent = "Unable to edit beverage!";
// //             messageElement.className = "text-danger";
// //         }
// //     };
// //     request.send(JSON.stringify(jsonData));
// // }

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
//         // Log the entire response for debugging
//         console.log("Response:", request.responseText);

//         try {
//             const response = JSON.parse(request.responseText);
//             const messageElement = document.getElementById("editMessage");
//             if (response.message === "Beverage updated successfully") {
//                 sessionStorage.setItem(
//                     "successMessage",
//                     `Edited beverage: ${jsonData.name} successfully!`
//                 );
//                 window.location.href = "index.html"; // Redirect to index.html
//             } else {
//                 messageElement.textContent = "Unable to edit beverage!";
//                 messageElement.className = "text-danger";
//             }
//         } catch (error) {
//             console.error("Error parsing response:", error);
//             document.getElementById("editMessage").textContent =
//                 "An error occurred!";
//             document.getElementById("editMessage").className = "text-danger";
//         }
//     };
//     request.onerror = function () {
//         document.getElementById("editMessage").textContent = "Network error!";
//         document.getElementById("editMessage").className = "text-danger";
//     };
//     request.send(JSON.stringify(jsonData));
// }

document.addEventListener("DOMContentLoaded", function () {
    const selectedBeverage = sessionStorage.getItem("selectedBeverage");
    if (selectedBeverage) {
        editBeverage(selectedBeverage);
    } else {
        alert("No beverage selected");
        document.getElementById("editMessage").textContent = "No beverage selected!";
        document.getElementById("editMessage").className = "text-danger";
    }
});

// Name should not be empty and less than 200 characters
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

// Image should be a valid URL and not empty
const imageInput = document.getElementById("editImage");
imageInput.addEventListener("input", function () {
    const imageError = document.getElementById("imageError");
    const imagePreview = document.getElementById("imagePreview");
    imageInput.value = imageInput.value.trim();

    if (imageInput.value === "") {
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
        imageError.textContent = "Image URL is not valid. Please select another URL!";
        imageInput.value = "";
        imagePreview.style.display = "none";
    };
});

// Price should be between 1 and 999999999.99
const priceInput = document.getElementById("editPrice");
priceInput.addEventListener("input", function () {
    const priceError = document.getElementById("priceError");
    const minPrice = 1;
    const maxPrice = 999999999.99;
    const priceValue = parseFloat(priceInput.value);

    if (isNaN(priceValue) || priceValue < minPrice || priceValue > maxPrice) {
        priceError.textContent = "Price must be between 1 and 999999999.99";
        priceInput.value = "";
    } else {
        priceError.textContent = "";
    }
});

// Description should not be empty and less than 500 characters
const descriptionInput = document.getElementById("editDescription");
descriptionInput.addEventListener("input", function () {
    const descriptionError = document.getElementById("descriptionError");
    if (descriptionInput.value.trim() === "") {
        descriptionError.textContent = "Description is required";
    } else if (descriptionInput.value.length > 500) {
        descriptionError.textContent = "Description should be 500 characters max";
        descriptionInput.value = descriptionInput.value.slice(0, 500);
    } else {
        descriptionError.textContent = "";
    }
});

// Rating should be between 1 and 5
const ratingInput = document.getElementById("editRating");
ratingInput.addEventListener("input", function () {
    const ratingError = document.getElementById("ratingError");
    const minRating = 1;
    const maxRating = 5;
    const ratingValue = parseFloat(ratingInput.value);

    if (isNaN(ratingValue) || ratingValue < minRating || ratingValue > maxRating) {
        ratingError.textContent = "Rating must be between 1 and 5";
        ratingInput.value = "";
    } else {
        ratingError.textContent = "";
    }
});

// Quantity should be between 1 and 1000
const quantityInput = document.getElementById("editQuantity");
quantityInput.addEventListener("input", function () {
    const quantityError = document.getElementById("quantityError");
    const minQuantity = 1;
    const maxQuantity = 1000;

    const quantityValue = parseInt(quantityInput.value, 10);

    if (isNaN(quantityValue) || quantityValue < minQuantity || quantityValue > maxQuantity || quantityValue !== Math.floor(quantityValue)) {
        quantityError.textContent = "Quantity must be an integer between 1 and 1000";
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
    document.getElementById("editDescription").value = selectedBeverage.description;
    document.getElementById("editRating").value = selectedBeverage.rating;
    document.getElementById("editQuantity").value = selectedBeverage.quantity;

    document.getElementById("updateButton").onclick = function () {
        updateBeverage(selectedBeverage.id);
    };
}

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

    // Check for any empty fields
    const allFieldsFilled = Object.values(jsonData).every(value => value.trim() !== "");

    if (!allFieldsFilled) {
        document.getElementById("editMessage").textContent = "All fields are required!";
        document.getElementById("editMessage").className = "text-danger";
        return;
    } else {
        document.getElementById("editMessage").textContent = "";
        document.getElementById("editMessage").classList.remove("text-danger");
    }

    const request = new XMLHttpRequest();
    request.open("PUT", `/edit-beverage/${id}`, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        console.log("Response:", request.responseText);

        try {
            const response = JSON.parse(request.responseText);
            const messageElement = document.getElementById("editMessage");
            if (response.message === "Beverage updated successfully") {
                sessionStorage.setItem("successMessage", `Edited beverage: ${jsonData.name} successfully!`);
                window.location.href = "index.html"; // Redirect to index.html
            } else {
                messageElement.textContent = "Unable to edit beverage!";
                messageElement.className = "text-danger";
            }
        } catch (error) {
            console.error("Error parsing response:", error);
            document.getElementById("editMessage").textContent = "An error occurred!";
            document.getElementById("editMessage").className = "text-danger";
        }
    };
    request.onerror = function () {
        document.getElementById("editMessage").textContent = "Network error!";
        document.getElementById("editMessage").className = "text-danger";
    };
    request.send(JSON.stringify(jsonData));
}
