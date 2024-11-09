import { CoursePart } from '../models/course'

interface PartProps {
  course: CoursePart
}

const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
        </div>
      )
    case 'group':
      return (
        <div>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Group projects: {course.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
          <p>
            Background material: <a href={course.backgroundMaterial}>Link</a>
          </p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3>{course.name}</h3>
          <p>Exercises: {course.exerciseCount}</p>
          <p>Description: {course.description}</p>
          <p>Requirements: {course.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(course)
  }
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export default Part
