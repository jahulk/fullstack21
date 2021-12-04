import React from 'react';
import Weather from './Weather';

const Country = ({ country }) => {
  const { name, capital, population, languages, flags } = country;
  const languages_array = Object.keys(languages).map((key) => languages[key]);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages_array.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={flags['png']}
        alt={name.common}
        style={{ width: '10%', height: '10%' }}
      />
      <Weather city={capital[0]} />
    </div>
  );
};

export default Country;
