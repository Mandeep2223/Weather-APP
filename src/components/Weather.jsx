import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import lightning_and_blue_rain from '../assets/lightning_and_blue_rain.svg'
import downpour_rainy_day from '../assets/downpour_rainy_day.svg'
import lightning_bolt from '../assets/lightning_bolt.svg'
import sun_icon from '../assets/sun_icon.svg'
import yellow_sun_and_blue_cloud from '../assets/yellow_sun_and_blue_cloud.svg'

const Weather = () => {
const inputRef = useRef()
const [weatherData, setWeatherData] = useState(false);

const allIcons = {
"01d": sun_icon,
"01n": sun_icon,
    "02d": sun_icon,
"02n": sun_icon,
    "03d": yellow_sun_and_blue_cloud,
"03n": yellow_sun_and_blue_cloud,
    "04d": yellow_sun_and_blue_cloud,
"04n": yellow_sun_and_blue_cloud,
    "09d": lightning_bolt,
"09n": lightning_bolt,
    "10d": lightning_bolt,
"10n": lightning_bolt,
    "11d": downpour_rainy_day,
"11n": downpour_rainy_day,
    "13d": downpour_rainy_day,
"13n": downpour_rainy_day,
    "50d": lightning_and_blue_rain,
"50n": lightning_and_blue_rain
}

const search = async (city) => {
    if(city===""){
        alert("Enter City Name");
        return;
    }
try {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

const response = await fetch(url);
const data = await response.json();
console.log(data);
const icon = allIcons[data.weather[0].icon] || clear_icon;
setWeatherData({
humidity: data.main.humidity, 
windSpeed: data.wind.speed,
temperature: Math.floor(data.main.temp),
location: data.name,
icon: icon
})
} catch (error) {

}
}

useEffect(()=>{
search("New York");
},[])


return (
<div class="weather">
<div className="search-bar">
<input ref={inputRef} type="text" placeholder='search'/> 
<img src={search_icon} alt="search_icon" onClick={()=>search(inputRef.current.value)}/>
</div>
<img src={weatherData.icon} alt="sun_icon" className='sun-icon' />
<p className='temperature'>{weatherData.temperature}'C</p>
<p className='location'>{weatherData.location}</p>
<div className="weather-data">
<div className="col">
<img src={yellow_sun_and_blue_cloud} alt="yellow_sun_and_blue_cloud" />
<div>
    <p>{weatherData.humidity}</p>
        <span>Sun and Cloud</span> 
</div>
</div>
<div className="col">
<img src={lightning_and_blue_rain} alt="lightning_and_blue_rain" />
<div>
    <p>{weatherData.windSpeed}km/h</p>
        <span>Rain</span> 
</div>
</div>
</div>
</div>
)
}

export default Weather
