const QueryInput = ({ query, handleChange }) => {
  return (
    <input
      type="text"
      value={query}
      placeholder="Start typing a country you want to seach"
      onChange={handleChange}
    ></input>
  );
};

export default QueryInput;
