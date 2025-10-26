import { useState, useEffect} from 'react'
import axios from 'axios'

const CountryDetails = ({country}) => {
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
    </div>
  )
}

const Results = ({filteredCountries}) => {
  const [countryData, setCountryData] = useState(null)

   useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => {
          setCountryData(response.data)
        })
    }
  }, [filteredCountries])

  if(filteredCountries.length === 0){
    return null
  }else if(filteredCountries.length > 10){
    return <div>Too many matches, specify another filter</div>
  }else if(filteredCountries.length === 1){
    return countryData? <CountryDetails country={countryData} /> : <p>loading...</p>
  }else{
    return <div>{filteredCountries.map(country => <div key={country}>{country}</div>)}</div>
  } 
}

function App() {
const apiKey = import.meta.env.VITE_WEATHER_KEY 
const [newCountry, setNewCountry] = useState('')
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
}

  return (
    <div>
      find countries <input value={newCountry} onChange={handleCountryChange} />
      <Results filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
