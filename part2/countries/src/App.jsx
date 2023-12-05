import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDetail from './components/CountryDetail'
import CountryList from './components/CountryList'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null) // Reset selected country when search changes
  }

  const countriesToShow = search
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange}/>
      {selectedCountry 
        ? <CountryDetail country={selectedCountry} />
        : countriesToShow.length > 10
          ? <p>Too many matches, specify another filter</p>
          : countriesToShow.length > 1
            ? <CountryList countries={countriesToShow} handleShowClick={setSelectedCountry} />
            : countriesToShow.map(country => (
              <CountryDetail key={country.name.common} country={country} />
            ))
      }
    </div>
  )
}

export default App

