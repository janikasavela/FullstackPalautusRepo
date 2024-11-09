import { CoursePart } from '../models/course'
import Part from './Part'

interface ContentProps {
  courses: CoursePart[]
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
      {courses.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </div>
  )
}

export default Content
