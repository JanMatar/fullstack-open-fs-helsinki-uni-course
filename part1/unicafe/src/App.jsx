import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine =({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total ? (good - bad)/(total) : 0
  const positive = total ? (good/total)*100 : 0
  
  if(total === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
     <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} /> 
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} /> 
      </table>
    </div>
   )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleBad = () => {
    setBad(bad + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const handleGood = () => {
    setGood(good + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App