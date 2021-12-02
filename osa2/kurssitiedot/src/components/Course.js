import React from 'react';

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Part = ({ part }) => <p>{part.name}</p>;

const Total = ({ parts }) => {
  let tot = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return (
    <p>
      <b>total of {tot} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
