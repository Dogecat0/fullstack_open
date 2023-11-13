import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

{/* Statistics should return a table */}
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total / 3
  const positive = good / total * 100

  return (
    <>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          {total > 0 ? (
            <>
              <Statistic text='all' value={total} />
              <Statistic text='average' value={average} />
              <Statistic text='positive' value={positive} />
            </>
          ) : (
            <tr><td>No feedback given</td></tr>
          )}
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  const headerText1 = 'give feedback'
  const headerText2 = 'statistics'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={headerText1} />
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Header text={headerText2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
