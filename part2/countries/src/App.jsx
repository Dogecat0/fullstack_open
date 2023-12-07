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

  const renderContent = () => {
    const isCountrySelected = selectedCountry !== null
    const tooManyMatches = countriesToShow.length > 10
    const singleCountryMatch = countriesToShow.length === 1

    if (isCountrySelected) {
      return <CountryDetail country={selectedCountry} />
    } else if (tooManyMatches) {
      return <p>Too many matches, specify another filter</p>
    } else if (singleCountryMatch) {
      return (
        <CountryDetail country={countriesToShow[0]} />
      )
    } else {
      return (
        <CountryList countries={countriesToShow} handleShowClick={setSelectedCountry} />
      )
    }
  }

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      {renderContent()}
    </div>
  )
}

export default App

