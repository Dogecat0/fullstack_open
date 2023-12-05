const CountryList = ({ countries }) => {
    return (
        <div>
        {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        </div>
    )
    }

export default CountryList