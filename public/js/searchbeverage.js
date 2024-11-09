document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchbeverage(); // Trigger the search when Enter is pressed
    }
});

function searchbeverage() {
    var searchTerm = document.getElementById("searchInput").value.trim(); // Get the search term

    // Validate the search term
    if (searchTerm === "") {
        document.getElementById("resultsContainer").innerHTML = ''; // Clear the results if search is empty
        return;
    }

    var request = new XMLHttpRequest();
    request.open("GET", "/search-beverage?name=" + encodeURIComponent(searchTerm), true); // Send GET request to the backend
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        var response = JSON.parse(request.responseText);
        console.log(response);

        if (response.length === 0) {
            document.getElementById("resultsContainer").innerHTML = "<p>No beverages found!</p>";
        } else {
            displaySearchResults(response); // If results are found, display them
        }
    };

    request.onerror = function () {
        document.getElementById("resultsContainer").innerHTML = "<p>Error occurred. Please try again.</p>";
    };

    request.send(); // Send the request
}

// Function to display the search results
function displaySearchResults(beverages) {
    var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ''; // Clear previous results

    // Loop through the beverages and display each
    beverages.forEach(function (beverage) {
        var beverageDiv = document.createElement("div");
        beverageDiv.classList.add("beverage-item");

        beverageDiv.innerHTML = `
            <h3>${beverage.name}</h3>
            <img src="${beverage.image}" alt="${beverage.name}" class="beverage-image" />
            <p><strong>Category:</strong> ${beverage.category}</p>
            <p><strong>Description:</strong> ${beverage.description || 'No description available'}</p>
            <p><strong>Price:</strong> $${beverage.price}</p>
            <p><strong>Rating:</strong> ${beverage.rating || 'Not rated'}</p>
            <p><strong>Quantity:</strong> ${beverage.quantity}</p>
        `;

        resultsContainer.appendChild(beverageDiv); // Add to results container
    });
}

// Function to set the search query when clicking on a popular search keyword
function setSearchQuery(keyword) {
    document.getElementById("searchInput").value = keyword; // Set the search input to the keyword
    searchbeverage(); // Trigger the search with the selected keyword
}
