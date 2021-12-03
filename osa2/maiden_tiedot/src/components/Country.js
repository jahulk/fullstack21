import React from 'react';

const Country = ({ country }) => {
  const { name, capital, population, languages, flags } = country;
  const languages_array = Object.keys(languages).map((l) => languages[l]);
  console.log(languages_array);

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
    </div>
  );
};
export default Country;
