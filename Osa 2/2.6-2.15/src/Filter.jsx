const Filter = ({ query, setQuery }) => {
    return (
      <div>
        filter shown with
        <input
          type="text"
          value={query}
          placeholder="give a filter"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    );
  };

  export default Filter;