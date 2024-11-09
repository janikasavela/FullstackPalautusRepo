interface TotalProps {
  sum: number
}

const Content = ({ sum }: TotalProps) => {
  return <p>Number of exercises {sum}</p>
}

export default Content
