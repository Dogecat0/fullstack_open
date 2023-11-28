const Total = ({ course }) => <p>Total number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>

export default Total