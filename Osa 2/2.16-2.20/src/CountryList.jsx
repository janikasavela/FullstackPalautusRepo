import ShowCountry from "./ShowCountry";

const CountryList = ({
  query,
  filteredCountries,
  selectedCountry,
  setFilteredCountries,
  setSelectedCountry,
}) => {
  return (
    <>
      {!query && <p>Start typing to search for a country</p>}
      {query && filteredCountries.length === 0 && !selectedCountry && (
        <p>No matches found</p>
      )}
      {query && filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {query &&
        filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button
              onClick={() => {
                setSelectedCountry(country);
                setFilteredCountries([]);
              }}
            >
              show
            </button>{" "}
          </div>
        ))}
      {query && selectedCountry && (
        <ShowCountry selectedCountry={selectedCountry} />
      )}
    </>
  );
};

export default CountryList;
