function Header({ course }) {
  return (
    <h1>{course.name}</h1>
  )
}

function Part({ course }) {
  return (
    <>
      {course.parts.map((part, index) => (
      <p key={index}>
        {part.name} {part.exercises}
      </p>
  ))}
    </>
  );
}

function Content({ course }) {
  return (
    <>
      <Part course={course} />
    </>
  )
}

function Total({ course }) {
  return (
    <p>Number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App