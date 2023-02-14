//selecting elements via html DOM
const inputForm = document.querySelector('#inputForm');
const btn = document.querySelector('#look')
const cityName = document.querySelector('#city');
const temp = document.querySelector('#deg');
const weatherType = document.querySelector('#weatherType')
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#windSpeed');

//variable that will contain our city
let city;

// you need to have own openweather api key
const apiKey = ""


//function for geting api response
async function getWeather(city,apiKey){
    let  response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    let obj = await response.json();
    return obj;

}

inputForm.addEventListener('keypress',function(event){
    
    updateWeather(event)
});

btn.addEventListener('click',function(event){
    updateWeather(event)
});

function updateWeather(event){
	if(event.key === 'enter' || event.type === 'click'){
        event.preventDefault();
		if(inputForm.value === ''){
			alert('Please enter a city name');
		}else {
			let city = inputForm.value
			cityName.innerHTML = `Weather in ${city}`
            
           getWeather(city,apiKey)
        //    .then(obj => weatherType.innerHTML =`${obj.weather.main}`)
            .then(weather => {
                temp.innerHTML =`${Math.round(weather.main.temp)} °C`
                humidity.innerHTML = `Humidity : ${weather.main.humidity}%`
                weatherType.innerHTML = `${weather.weather[0].main}`
                windSpeed.innerHTML = `${Math.round(weather.wind.speed)} Km/h`
            })

            
        }
    }

}
