import React from 'react';

const Persons = ({ filter, persons, deletePerson }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
