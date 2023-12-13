// Generate Random Number in Diapason 
function getRandomImdbID() {
    const min = 1000000;
    const max = 1300000;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return `tt${randomNum}`;
}

// Submit Event 
document.getElementById('searchBtn').addEventListener('click', function (event) {
    // Disable Default
    event.preventDefault();

    // Generate Random imdbID
    const randomImdbID = getRandomImdbID();

    // Variables To Work With API  
    let API_KEY = "8a1260da";
    let API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${randomImdbID}`;

    // Fetch Request
    fetch(API_URL)
        .then(response => {
            // Response Error
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            // Return Serializable Json Response 
            return response.json();
        })
        // Promise Resolve
        .then(data => {
            // Call Function to Update UI With API Response 
            displayWeather(data);
        })
        // Promise Reject  
        .catch(error => {
            // Display Error 
            console.error('There was a problem fetching the weather data:', error);
        });
});

function displayWeather(weatherData) {
    // Display Error To UI 
    if (weatherData.error) {
        alert(weatherData.error);
    }

    // Display Information To UI 
    else {
        let filmImage = document.getElementById('film__img');

        let filmTitle = document.getElementById('film__title');

        filmTitle.textContent = weatherData.Title;

        filmImage.src = weatherData.Poster;

        // Update UI with Response 
        const listItems = document.querySelectorAll('ul li');

        // Update Text in Each <li>
        listItems.forEach(li => {

            // Share Text by ":" Symbol
            const parts = li.textContent.split(':');

            // If ":" Already Define, Update Second Value
            if (parts.length === 2) {
                const field = parts[0].trim();
                if (weatherData[field]) {
                    li.textContent = `${field}: ${weatherData[field]}`;
                }
            }
        });
        // Display Film Section Element 
        document.querySelector(".film__section").style.visibility = "visible";
    }
}