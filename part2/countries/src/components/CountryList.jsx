const CountryList = ({ countries, handleShowClick }) => {
    return (
        <div>
        {countries.map(country => <p key={country.name.common}>{country.name.common}<button onClick={() => handleShowClick(country)}>show</button></p>)}
        </div>
    )
    }

export default CountryList