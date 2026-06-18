import { useState } from 'react'

const Button = (props) => {


  return (
    <button onClick={props.value}>
      {props.text}
    </button>
  )

}



const StatisticLine = ({ text, value }) => {




  return (
    <tr>
      <td>{text} : {value}</td>
    </tr>
  )

}




const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + bad + neutral

  const average = total > 0 ? (good - bad) / total : 0


  const positive = total > 0 ? (good / total) * 100 : 0


  return (

    <div>
      <h1>Give FeedBack</h1>
      <Button value={() => setGood(good + 1)} text="Good" />
      <Button value={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button value={() => setBad(bad + 1)} text="Bad" />

      <div><h1>Statistics</h1></div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={` ${positive} %`} />
        </tbody>
      </table>

    </div >
  )
}

export default App