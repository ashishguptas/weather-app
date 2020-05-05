// api key : 82005d27a116c2880c8f0fcb866998a0

const notificationElem = document.querySelector('.notification');
const iconElem = document.querySelector('.weather-icon');
const tempElem = document.querySelector('.temperature-value p');
const descriptionElem = document.querySelector('.temperature-description p');
const locationElem = document.querySelector('.location p');

const weather = {};

weather.temperature = {
    unit: 'celsius'
}

const minus = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElem.style.display = "block";
    notificationElem.innerHTML = '<p>Browser doesn\'t Support Geolocation</p>'
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElem.style.display = "block";
    notificationElem.innerHTML = `<p>${error.message}</p>`
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    // console.log(api)

    fetch(api)
        .then(function (response) {
            let data = response.json();
            // console.log(data)
            return data
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - minus);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            showWeather();
        });

}
function showWeather() {
    iconElem.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`;
    tempElem.innerHTML = `${weather.temperature.value} <sup>o</sup> <span>C</span>`;
    descriptionElem.innerHTML = `${weather.description}`
    locationElem.innerHTML = `${weather.city}, ${weather.country}`
}

function celsiusToFahre(temperature){
    return (temperature * 9/5) + 32;
}

tempElem.addEventListener('click', function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === 'celsius'){
        let farenheit = celsiusToFahre(weather.temperature.value);
        farenheit = Math.floor(farenheit);
        tempElem.innerHTML = `${farenheit} <sup>o</sup> <span>F</span>`;
        weather.temperature.unit = 'farenheit';
    } else{
        tempElem.innerHTML = `${weather.temperature.value} <sup>o</sup> <span>C</span>`;
        weather.temperature.unit = 'celsius';
    }
})

 