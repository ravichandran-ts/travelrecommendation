document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");
    const resultsContainer = document.getElementById("resultsContainer");

    let travelData = {};

    // Task 6: Fetch data from the JSON API
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log("Data fetched successfully:", travelData);
        })
        .catch(error => console.error("Error fetching data:", error));

    // Task 7 & 8: Keyword searches and Recommendation results
    searchBtn.addEventListener("click", () => {
        const input = document.getElementById("searchInput").value.toLowerCase();
        resultsContainer.innerHTML = ""; // Clear previous results

        if (input.includes("beach")) {
            displayResults(travelData.beaches);
        } else if (input.includes("temple")) {
            displayResults(travelData.temples);
        } else if (input.includes("country")) {
            // Your JSON nests 'cities' inside 'countries', so we need to extract them
            let allCities = [];
            travelData.countries.forEach(country => {
                allCities = allCities.concat(country.cities);
            });
            // Pass true to trigger the optional timezone feature
            displayResults(allCities, true); 
        } else {
            resultsContainer.innerHTML = "<p>No recommendations found for this keyword. Try 'beach', 'temple', or 'country'.</p>";
        }
    });

    // Task 9: Clear button logic
    clearBtn.addEventListener("click", () => {
        document.getElementById("searchInput").value = "";
        resultsContainer.innerHTML = "";
    });

    // Helper function to build the HTML cards for the results
    function displayResults(places, showTime = false) {
        places.forEach(place => {
            const card = document.createElement("div");
            card.classList.add("card");

            let timeString = "";
            
            // Task 10: Optional Country Time Logic
            // The JSON city names format is "Sydney, Australia", so we check if it includes "Sydney"
            if (showTime && place.name.toLowerCase().includes("sydney")) {
                const options = { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                const localTime = new Date().toLocaleTimeString('en-US', options);
                timeString = `<p><strong>Local Time:</strong> ${localTime}</p>`;
            }

            card.innerHTML = `
                <img src="images/${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                ${timeString}
            `;
            resultsContainer.appendChild(card);
        });
    }
});
