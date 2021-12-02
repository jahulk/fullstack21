import React from "react";

const Header = (props) => <h1>{props.name}</h1>;

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part part={part} />
    ))}
  </>
);

const Part = (props) => <p>{props.part.name}</p>;

const Total = (props) => {
  let tot = props.parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return <p>Number of exercises {tot}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
