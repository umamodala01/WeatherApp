// WEATHER APP FUNCTIONALITY

// Select Elements
const dateElem = document.querySelector('#date');
const cityElem = document.querySelector('#city');
const tempElem = document.querySelector('#temp');
const tempImgElem = document.querySelector('#temp-img');
const descriptionElem = document.querySelector('#description');
const tempMaxElem = document.querySelector('#temp-max');
const tempMinElem = document.querySelector('#temp-min');

// Set Current Date
const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = dateObj.getDate();
const year = dateObj.getFullYear();

dateElem.innerHTML = `${month} ${day}, ${year}`;


// MAIN WEATHER FUNCTION
const getWeather = async () => {
    try {
        const cityName = document.getElementById('search-bar-input').value.trim();

        if (!cityName) {
            alert("Please enter a city name!");
            return;
        }

        // 🔥 PUT YOUR OPENWEATHERMAP API KEY HERE
        const API_KEY = "6a27ab3de3d859d1bd08dd30b9e2b968";

        // Fetch Weather Data
        const weatherDataFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );

        if (!weatherDataFetch.ok) {
            throw new Error("City not found or invalid API key");
        }

        const weatherData = await weatherDataFetch.json();

        // Update UI with data
        cityElem.innerHTML = weatherData.name;
        descriptionElem.innerHTML = weatherData.weather[0].main;
        tempImgElem.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">
        `;
        tempElem.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;
        tempMaxElem.innerHTML = `${Math.round(weatherData.main.temp_max)}°C`;
        tempMinElem.innerHTML = `${Math.round(weatherData.main.temp_min)}°C`;
    } 
    catch (error) {
        console.error(error);

        // Display error user-friendly message
        cityElem.innerHTML = "Not Found";
        descriptionElem.innerHTML = "";
        tempElem.innerHTML = "";
        tempImgElem.innerHTML = "";
        tempMaxElem.innerHTML = "";
        tempMinElem.innerHTML = "";
    }
};
