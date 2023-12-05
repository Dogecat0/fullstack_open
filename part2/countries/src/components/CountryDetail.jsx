import Weather from "./Weather";

const CountryDetail = ({ country }) => (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={country.name.common + language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.name.common} width="200" />
      <Weather capital={country.capital} capitalInfo={country.capitalInfo} />
    </div>
  );

export default CountryDetail;