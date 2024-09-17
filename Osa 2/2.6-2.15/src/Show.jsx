import noteService from "./services/persons";

const Show = ({ filteredPersons, query, persons, setPersons }) => {
  const handeClick = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      noteService.delete(id).then((res) => {
        console.log(res);
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== res.id)
        );
      });
    }
  };

  if (query) {
    if (filteredPersons.length > 0) {
      return (
        <>
          <h2>Numbers</h2>
          {filteredPersons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
        </>
      );
    } else {
      return <p>No matching results found.</p>;
    }
  } else {
    return (
      <>
        <h2>Numbers</h2>
        {persons.map((person) => (
          <div key={person.name}>
            <span>
              {person.name} {person.number}{" "}
            </span>
            <button onClick={() => handeClick(person.id)}>delete</button>
          </div>
        ))}
      </>
    );
  }
};

export default Show;
