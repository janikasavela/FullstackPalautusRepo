export default function Course({ course }) {
  return (
    <div>
      <Header header={course.name} />
      <Content content={course} />
      <Total parts={course.parts} />
    </div>
  );
}

const Header = ({ header }) => {
  return <h2>{header}</h2>;
};

const Content = ({ content }) => {
  return (
    <div>
      {content.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <strong>Total of {totalExercises} exercises</strong>;
};
