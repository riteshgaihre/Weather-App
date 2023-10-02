const apiKey = "dcd73304949b4c9dcb996cb41245c2f7";
const weatherData = document.getElementById("weather-data");
const cityName = document.getElementById("city-name");
const form = document.querySelector("form");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const getCityName = cityName.value;
    getWeatherDetails(getCityName);
})
async function getWeatherDetails(getCityName){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getCityName}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`;

        weatherData.querySelector(".temperature").textContent=`${temperature}°C`;

        weatherData.querySelector(".description").textContent=description;
        
        weatherData.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";

        weatherData.querySelector(".temperature").textContent="";

        weatherData.querySelector(".description").textContent= "Invalid city Name";
        
        weatherData.querySelector(".details").innerHTML="";  
    }
}