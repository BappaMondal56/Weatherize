let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let windSpeed = document.getElementById('wind-speed');
let feelsLike = document.getElementById('feels-like'); // Add this line
let main = document.querySelector('main');
let errorMessage = document.querySelector('.error-message');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.cod == 200){
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                document.getElementById('weather-description').innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
                windSpeed.innerText = data.wind.speed;
                feelsLike.innerText = data.main.feels_like; // Add this line

                errorMessage.style.display = 'none';
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
                errorMessage.style.display = 'block';
            }
            valueSearch.value = '';
        })
        .catch(() => {
            main.classList.add('error');
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
            errorMessage.style.display = 'block';
        });
}

// search Default
const initApp = () => {
    valueSearch.value = 'Tarakeswar';
    searchWeather();
}
initApp();
