const Part = ({name, exercises}) => {
  console.log({name, exercises})
  return (<p> {name} {exercises} </p>)
} 

const Header = ({course}) => {
  console.log({course})  
  return <h1>{course.name}</h1>
}


const Content = ({course}) =>{
  console.log({course});
  return(
  <div>
    <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
    <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
    <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
  </div>  
)}

const Total = ({course}) => {
  console.log({course});
  return(
  <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
)}


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