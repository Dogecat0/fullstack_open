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

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature: {weather.current.temperature} Celsius</p>
            <img src={weather.current.weather_icons} alt={capital} />
            <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather