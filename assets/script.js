var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".search-btn");
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?qDallas&appid=78a9f6b01adc179ac9fe95c5eea813ab&units=metric";
var weatherIcon = document.querySelector(".icon");

var APIKey = "78a9f6b01adc179ac9fe95c5eea813ab";

var getCityCoordinates = () => {
    console.log("click")

    var cityName = cityInput.value;
    if (!cityName) return;
    var queryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey;
    
    fetch(queryUrl)
        .then(res => res.json())
        .then(data => {
            var lat = data[0].lat
            var lon = data[0].lon
            getCurrentWeather(lat, lon,)

        })
         
}

var getCurrentWeather = (lat, lon) => {
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey 
    fetch(currentUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //display current weather data on the browser
            var city = data.name
            var temperature = data.main.temp
            var wind = data.wind.speed
            var humidity = data.main.humidity
            var cityEl = document.querySelector(".current-city");
            var tempEl = document.querySelector(".current-temp");
            var windEl = document.querySelector(".current-wind");
            var humidityEl = document.querySelector(".current-hum");

            cityEl.textContent = "" + city
            tempEl.textContent = "Temperature: " + temperature
            windEl.textContent = "Wind: " + wind + "mph"
            humidityEl.textContent = "Humidity: " + humidity

            if(data.weather[0].main == "clouds"){
                weatherIcon.src ="images/clouds.png";

            }
            else if(data.weather[0].main == "clear"){
                weatherIcon.src ="images/clear.png";
            
            }
            else if(data.weather[0].main == "drizzle"){
                weatherIcon.src ="images/drizzle.png";
            }
            else if(data.weather[0].main == "rainy"){
                weatherIcon.src ="images/rainy.png";
            }
            else if(data.weather[0].main == "sunny"){
                weatherIcon.src ="images/sunny.png";
            }
            else if(data.weather[0].main == "thunderstorm"){
                weatherIcon.src ="images/thunderstorm.png";
            }


        
        })
}
searchButton.addEventListener("click", getCityCoordinates);

var cityInput = JSON.parse(localStorage.getItem("city-input"));



//Function to get current weather
//Function to get weather forcast
//Append data bellow search bar for city history

