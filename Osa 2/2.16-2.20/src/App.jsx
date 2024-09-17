import { useEffect, useState } from "react";
import axios from "axios";

import QueryInput from "./Input";
import CountryList from "./CountryList";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log(filteredCountries);

  function handleChange(e) {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
    } else {
      const newFilteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      );

      console.log(newFilteredCountries);
      if (newFilteredCountries.length === 1)
        setSelectedCountry(newFilteredCountries[0]);
      else setSelectedCountry(null);

      setFilteredCountries(newFilteredCountries);
    }
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <>
      <QueryInput query={query} handleChange={handleChange} />
      <CountryList
        query={query}
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        setFilteredCountries={setFilteredCountries}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  );
}

export default App;
