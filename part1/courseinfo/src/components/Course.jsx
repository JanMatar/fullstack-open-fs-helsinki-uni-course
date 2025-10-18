const Part = ({name, exercises}) => {
  console.log({name, exercises})
  return (<p> {name} {exercises} </p>)
}

const Header = ({course}) => {
  console.log({course})  
  return <h3>{course.name}</h3>
}

const Content = ({course}) =>{
  console.log({course});
  return(
  <div>
    {course.parts.map(part => (<Part key={part.id} name={part.name} exercises={part.exercises} />))}
    <Total course={course} />
  </div>  
)}


const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) => {return sum + part.exercises}, 0)
  return(<p><strong>total of {total} exercises</strong></p>)
}

export default Course