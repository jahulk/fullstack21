import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const displayNotification = (type, content) => {
    if (type === 'success') {
      setMessage(content);
      setTimeout(() => {
        setMessage('');
      }, 2500);
    } else if (type === 'error') {
      setError(content);
      setTimeout(() => {
        setError('');
      }, 2500);
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (person) {
      changeNumber(person);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        displayNotification('success', `Added ${returnedPerson.name}`);
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          displayNotification('success', `Deleted ${person.name}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const changeNumber = (person) => {
    if (
      window.confirm(
        `${person.name} is already added to the phonebook, replace the old number with a new one?`
      )
    ) {
      const personObject = {
        ...person,
        number: newNumber,
      };

      personService
        .update(person.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== updatedPerson.id ? p : updatedPerson))
          );
          displayNotification('success', `${person.name} number updated`);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          displayNotification(
            'error',
            `Information of ${person.name} has already been removed from the server`
          );
        });
    }
  };

  return (
    <div>
      {error.length > 0 && <Notification content={error} type="error" />}
      {message.length > 0 && <Notification content={message} type="success" />}
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
