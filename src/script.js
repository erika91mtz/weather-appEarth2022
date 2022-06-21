function showTime(date) {
  let currentTime = new Date();
  console.log(currentTime);

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let time = `Today is ${day} ${currentHour}:${currentMinute}`;
  return time;
}
console.log(showTime(new Date()));

let specialTime = document.querySelector("#time-now");
console.log(specialTime);
specialTime.innerHTML = showTime(new Date());

function displayWeatherConditions(response) {
  console.log(response.data.name);
  document.querySelector("#city-name-one").innerHTML = response.data.name;
  document.querySelector("#city-name-two").innerHTML = response.data.name;
  document.querySelector("#city-name-three").innerHTML = response.data.name;
  document.querySelector("#city-name-four").innerHTML = response.data.name;
  document.querySelector("#city-name-five").innerHTML = response.data.name;
  document.querySelector("#city-name-six").innerHTML = response.data.name;
  document.querySelector("#city-name-seven").innerHTML = response.data.name;
  document.querySelector("#temp-one").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-one").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-one").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#card-text-one").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "094ef7b80999d61ff577761824d67d3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "094ef7b80999d61ff577761824d67d3d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-one");
  let description = document.querySelector("#card-text-one");
  tempElement.innerHTML = `${temperature}℉`;
  description.innerHTML = response.data.weather[0].description;
}
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Denver");
