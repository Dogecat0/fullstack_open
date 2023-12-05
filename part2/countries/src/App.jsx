import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDetail from './components/CountryDetail'
import CountryList from './components/CountryList'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = search
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange}/>
      {countriesToShow.length > 10
        ? <p>Too many matches, specify another filter</p>
        : countriesToShow.length > 1
          ? <CountryList countries={countriesToShow} />
          : countriesToShow.map(country => (
            <CountryDetail key={country.name.common} country={country} />
          ))
      }
    </div>
  )
}

export default App

