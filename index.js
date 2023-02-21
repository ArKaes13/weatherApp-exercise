// fetches the weather data asynchronously
async function getWeatherData(city) {
    const apiKey = 'cada440a700d879ef02d06371b1da483'
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {mode: 'cors'})
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error)
    }
}

// Takes the weather data and displays it in HTML elements
async function displayData() {
    const data = await getWeatherData(getLocation())
    const description = document.querySelector('.weatherDescription');
    const location = document.querySelector('.location');
    const temperature = document.querySelector('.temperature');
    const feelsLike = document.querySelector('.feelsLike');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');

    description.textContent = data.weather[0].main.toUpperCase();
    location.textContent = data.name;
    temperature.textContent = `${kelvinToFarenheit(data.main.temp)}`;
    feelsLike.textContent = `${kelvinToFarenheit(data.main.feels_like)}`;
    wind.textContent = `Wind: ${data.wind.speed} MPH`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

// Converts the original data values from Kelvin to Farenheit
function kelvinToFarenheit(temperature) {
    return Math.round((temperature - 273.15) * 9/5 + 32);
}

// Changes farenheit to celsius and vice versa when button is clicked
function celsiusOrFarenheit() {
    const btn = document.querySelector('.tempBtn');
    const celsiusSpan = btn.getElementsByTagName('span')[0];
    const farenheitSpan = btn.getElementsByTagName('span')[1];
    const temperature = document.querySelector('.temperature');
    const feelsLike = document.querySelector('.feelsLike');

    btn.addEventListener('click', () => {
        const originalTemperature = Number(temperature.textContent);
        const originalFeelsLike = Number(feelsLike.textContent);
        if (farenheitSpan.classList[0] == 'active') {
            celsiusSpan.classList.add('active')
            farenheitSpan.classList.remove('active')
            temperature.textContent = `${Math.round((originalTemperature - 32) * 5 / 9)}`
            feelsLike.textContent = `${Math.round((originalFeelsLike - 32) * 5 / 9)}`
        } else {
            farenheitSpan.classList.add('active')
            celsiusSpan.classList.remove('active')
            temperature.textContent = `${Math.round((originalTemperature * 9 / 5) + 32)}`
            feelsLike.textContent = `${Math.round((originalFeelsLike * 9 / 5) + 32)}`
        }
    })
}

// gets a location from the input and returns it
function getLocation() {
    const cityInput = document.querySelector('#city')
    let location = cityInput.value
    return location
}

// When submit button is clicked, gets the new location value and displays new data
function submitCity() {
    const submitBtn = document.querySelector('.formBtn')

    submitBtn.addEventListener('click', () => {
        getLocation();
        displayData();
    })
}

displayData();
celsiusOrFarenheit();
submitCity();
