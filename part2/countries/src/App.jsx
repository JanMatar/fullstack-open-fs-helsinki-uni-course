import { useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
      .then(response => setWeather(response.data))
  }, [country.capital]) 
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        Area {country.area}
      </p>
      <h2>
        Languages
      </h2>
      <ul>
        {Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)}
      </ul>
      <img src={country.flags.png} />
      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}

const Results = ({filteredCountries, selectedCountry, setSelectedCountry}) => {
  const [countryData, setCountryData] = useState(null)

   useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => {
          setCountryData(response.data)
        })
    } else if(selectedCountry){
      axios   
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
        .then(response => {
          setCountryData(response.data)
      })
    } else {
      setCountryData(null)
    }
  }, [filteredCountries, selectedCountry])

  if(filteredCountries.length === 0){
    return null
  }else if(filteredCountries.length > 10){
    return <div>Too many matches, specify another filter</div>
  }else if(filteredCountries.length === 1){
    return countryData ? <CountryDetails country={countryData} /> : <p>loading...</p>
  }else if(selectedCountry && countryData){
    return <CountryDetails country={countryData} />
  }else{
    return (<div>
      {filteredCountries.map(country => <div key={country}>
        {country} <button onClick={() => setSelectedCountry(country)}>show</button></div>)}
      </div>)
  } 
}

function App() {
const [newCountry, setNewCountry] = useState('')
const [selectedCountry, setSelectedCountry] = useState(null)
const [countries, setCountries] = useState([])
const [filteredCountries, setfilteredCountries] = useState([])

useEffect(() => {
  axios
  .get("https://studies.cs.helsinki.fi/restcountries/api/all")
  .then(response => {
    setCountries(response.data.map(country => country.name.common))
  })
} ,[])

const handleCountryChange = (event) => {
  setNewCountry(event.target.value)
  setfilteredCountries(countries.filter(country => country.toLowerCase().startsWith(event.target.value.toLowerCase())))
  setSelectedCountry(null)
}

  return (
    <div>
      find countries <input value={newCountry} onChange={handleCountryChange} />
      <Results filteredCountries={filteredCountries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </div>
  )
}

export default App
