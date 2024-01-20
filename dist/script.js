const apiKey = "150a0db6f53575bdd7da940e985ade7f"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn")
const weatherIcon = document.querySelector(".weatherIcon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json()

    if(response.status === 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
        document.querySelector(".failed-loc").style.display = "none"

    } else {
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./dist/images/clouds.png"
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./dist/images/clear.png"
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./dist/images/drizzle.png"
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./dist/images/mist.png"
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "./dist/images/snow.png"
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./dist/images/rain.png"
        }

        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "flex"
        document.querySelector(".failed-loc").style.display = "none"
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})



const button = document.querySelector(".userLocation")

async function getlocation(position){
    const result = await getUserLocationData(position.coords.latitude, position.coords.longitude)
    checkWeather(result[0].name)
}

function failedToGet(){
    document.querySelector(".error").style.display = "none"
    document.querySelector(".weather").style.display = "none"
    document.querySelector(".failed-loc").style.display = "block"
}

async function getUserLocationData(lat,long){
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${apiKey}`)
    return await response.json()
}

button.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition(getlocation,failedToGet)

})