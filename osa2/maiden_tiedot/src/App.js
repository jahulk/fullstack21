import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Country from './components/Country';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowClick = (countryName) => {
    setFilter(countryName);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const countryList = () =>
    filteredCountries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}{' '}
        <button onClick={() => handleShowClick(country.name.common)}>
          show
        </button>
      </div>
    ));

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        countryList()
      )}
    </div>
  );
};

export default App;
