// Submit Event
document.getElementById('searchBtn').addEventListener('click', function (event) {
    // Disable Default
    event.preventDefault();

    // Get Input City Information 
    const Film = document.getElementById('input__film').value.trim();

    // Call Request Function
    getFilm(Film);
});

function getFilm(Film) {

    // Variables To Work With API  
    let API_KEY = "8a1260da";
    let API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${Film}`;

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
            displayFilm(data);
        })
        // Promise Reject  
        .catch(error => {
            // Display Error 
            console.error('There was a problem fetching the Film:', error);
        });
}


// Update UI With API Response 
function displayFilm(FilmData) {
    // Get UI 
    const FilmInfo = document.getElementById('container');

    // Check if error message already exists
    const existingErrorMessage = FilmInfo.querySelector('.error-message');

    // Display Error To UI 
    if (FilmData.Response === 'False') {
        if (!existingErrorMessage) {
            const errorMessage = document.createElement('div');
            // Create Class to Handle Errors 
            errorMessage.className = 'error-message';
            errorMessage.textContent = `Error: ${FilmData.Error}`;
            errorMessage.style.background = 'red';
            errorMessage.style.display = 'flex';
            errorMessage.style.alignItems = 'center';
            errorMessage.style.justifyContent = 'center';
            errorMessage.style.borderRadius = '20px';

            // Append error message to the container
            FilmInfo.appendChild(errorMessage);
        }
    }

    // Display Information To UI 
    else {
        // Remove existing error message if it exists
        if (existingErrorMessage) {
            FilmInfo.removeChild(existingErrorMessage);
        }

        // Display Film Image And Title 
        let filmImage = document.getElementById('film__img');

        let filmTitle = document.getElementById('film__title');

        filmTitle.textContent = FilmData.Title;

        filmImage.src = FilmData.Poster;
        // Update UI with Response 

        const listItems = document.querySelectorAll('ul li');

        // Update Text in Each <li>
        listItems.forEach(li => {

            // Share Text by ":" Symbol
            const parts = li.textContent.split(':');

            // If ":" Already Define, Update Second Value
            if (parts.length === 2) {
                const field = parts[0].trim();
                if (FilmData[field]) {
                    li.textContent = `${field}: ${FilmData[field]}`;
                }
            }
        });
        // Display Film Section Element 
        document.querySelector(".film__section").style.visibility = "visible";
    }
}