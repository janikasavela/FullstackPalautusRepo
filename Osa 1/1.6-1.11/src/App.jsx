import { useState } from "react";

const StatisticsLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      <h2>Statistics</h2>
      {total > 0 ? (
        <table>
          <tbody>
            <StatisticsLine value={good} text="good" />
            <StatisticsLine value={neutral} text="neutral" />
            <StatisticsLine value={bad} text="bad" />
            <StatisticsLine value={total} text="total" />
            <StatisticsLine value={average} text="average" />
            <StatisticsLine value={positive} text="positive %" />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setAverage((good + 1 - bad) / (total + 1));
    setPositive(((good + 1) / (total + 1)) * 100);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setAverage((good - bad) / (total + 1));
    setPositive((good / (total + 1)) * 100);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setAverage((good - (bad + 1)) / (total + 1));
    setPositive((good / (total + 1)) * 100);
  };

  const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
