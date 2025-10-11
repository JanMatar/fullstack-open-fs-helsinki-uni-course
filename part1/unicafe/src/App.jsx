import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total ? (good - bad)/(total) : 0
  const positive = total ? (good/total)*100 : 0
  
  return(
     <div>
      <h1>statistics</h1>
      good {good} <br /> 
      neutral {neutral} <br />
      bad {bad} <br />
      average {average} <br />
      positive {positive} %
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
      
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App