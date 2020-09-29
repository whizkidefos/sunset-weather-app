const api = {
    key: '393ee71cb98d0caaed2fafd128c34002',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search__box');

function getDate() {
    var cDate = new Date();
    document.querySelector(".location .date").innerHTML = cDate.toString();
}

getDate();

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

displayResults = (weather) => {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi__low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

getResults = (query) => {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

setQuery = (event) => {
    if (event.keyCode == 13) {
        getResults(searchBox.value)
    }
}

searchBox.addEventListener('keypress', setQuery);