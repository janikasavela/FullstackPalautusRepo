const Add = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add a new</h2>
      <div>
        name:
        <input
          type="text"
          value={newName}
          placeholder="add name"
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          // type="number"
          value={newNumber}
          placeholder="give a phonenumber"
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Add;
