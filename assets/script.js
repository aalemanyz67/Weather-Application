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
            getWeatherForecast(lat, lon)

        })
         
}

var getCurrentWeather = (lat, lon) => {
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric"; 
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

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src ="images/clouds.png";

            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src ="images/clear.png";
            
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src ="images/drizzle.png";
            }
            else if(data.weather[0].main == "Rainy"){
                weatherIcon.src ="images/rainy.png";
            }
            else if(data.weather[0].main == "Sunny"){
                weatherIcon.src ="images/sunny.png";
            }
            else if(data.weather[0].main == "Thunderstorm"){
                weatherIcon.src ="images/thunderstorm.png";
            }


        
        })

       
}

var getWeatherForecast = (lat, lon) => {
    var currentUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=metric";
    fetch(currentUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            for(var i = 0; i < 5; i ++){
             var day = data.list[i * 8] 
             day.main.temp  
             var dayEl = document.querySelector(".card-" +(i+1));
             dayEl.children[2].textContent = "Temperature: " + day.main.temp;
             dayEl.children[3].textContent = "Wind: " + day.wind.speed + " mph";
             dayEl.children[4].textContent = "Humidity: " + day.main.humidity;
             dayEl.children[0].textContent = "Date: " + day.dt_txt.split(" ")[0];

             if(day.weather[0].main == "Clouds"){
                dayEl.children[1].src ="images/clouds.png";

            }
            else if(day.weather[0].main == "Clear"){
                dayEl.children[1].src ="images/clear.png";
            
            }
            else if(day.weather[0].main == "Drizzle"){
                dayEl.children[1].src ="images/drizzle.png";
            }
            else if(day.weather[0].main == "Rainy"){
                dayEl.children[1].src ="images/rainy.png";
            }
            else if(day.weather[0].main == "Sunny"){
                dayEl.children[1].src ="images/sunny.png";
            }
            else if(day.weather[0].main == "Thunderstorm"){
                dayEl.children[1].src ="images/thunderstorm.png";
            }


            }


        })
    }    










    //var cityInput = JSON.parse(localStorage.getItem("city-input"));



//Function to get current weather
//Function to get weather forcast
//Append data bellow search bar for city history

searchButton.addEventListener("click", getCityCoordinates);