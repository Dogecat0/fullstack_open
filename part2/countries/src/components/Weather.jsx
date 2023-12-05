import {useState, useEffect} from 'react'

const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY;

console.log('Weather API Key:', weatherAPI);

const Weather = ({capital, capitalInfo}) => {
    const [weather, setWeather] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&exclude=hourly,daily&appid=${weatherAPI}`)
                const data = await response.json()
                setWeather(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        getWeather()
    }, [capital, capitalInfo])

    if (loading) {
        return <div>Loading weather data...</div>
    }
    if (error) {
        return <div>Error loading weather data.</div>
    } 

    // convert kelvin to celsius and format to two decimal places
    const celsius = (weather.current.temp - 273.15).toFixed(2)
    const icon = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png` // @2x means icon size
    
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature: {celsius} Celsius</p>
            <img src={icon} alt={capital} />
            <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather