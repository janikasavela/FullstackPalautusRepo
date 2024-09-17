import ShowWeather from "./ShowWeather";

const ShowCountry = ({ selectedCountry }) => {
  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>capital: {selectedCountry.capital[0]}</p>
      <p>area: {selectedCountry.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(selectedCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={selectedCountry.flags.svg}
        style={{ height: "250px", width: "250px" }}
        alt={`Flag of ${selectedCountry.name.common}`}
      />
      <ShowWeather selectedCountry={selectedCountry} />
    </div>
  );
};

export default ShowCountry;
