import { useEffect, useState } from 'react'
import Cloud from "../assets/cloudy.png";
import rain from "../assets/rainy-day.png";
import sunny from "../assets/sunny.png";

const Weather = () => {
    const [city, setCity] = useState(null);
    const [ search, setSearch] = useState("Mumbai");

    const getWeatherImage = (temp) => {
        if (temp < 10) {
            return Cloud;  // Cloudy or cold weather
        } else if (temp >= 10 && temp < 25) {
            return rain;  // Mild or rainy weather
        } else {
            return sunny;  // Warm and sunny weather
        }
    };
    
  

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c64580a5bc51fa70322da6d5ade7cccd&units=metric`;
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.main) {
                    setCity(data.main);  // Set city to data.main (where temp is located)
                } else {
                    setCity(null); // Handle case where the city is not found or invalid
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchApi();
    }, [search]);

  return (
    <div className='conatiner'>
        <input placeholder='Enter City' type='search'
        className='inputfeild' onChange={(e)=>{setSearch(e.target.value)}}/>
       <div className='display-div'>
         {/* Display the image based on temperature */}
   {city && (
            <div className='weather-image'>
                <img 
                    src={getWeatherImage(city.temp)} 
                    alt="weather" 
                    style={{ width: '80px', height: '80px' }} 
                />
            </div>
        )}
        <h2 className='Location'>  {search} </h2>
       </div>
       
     <div className='info'>
      {/* Display temperature only if city is available */}
         <p>Temperature: {city ? `${city.temp}°C` : 'City not found'}</p>
     </div>
 <div className='info-min'>
   <div>Max: {city.temp_max}  |</div>
    <div>Min: {city.temp_min}</div>
  </div>

 </div>
    );
};
export default Weather
