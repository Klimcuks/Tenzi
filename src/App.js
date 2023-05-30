import "./style.css";
import Die from "./components/Die";
import { useState } from "react";

function App() {
  const [dice, setDice] = useState(allDice());

  function allDice() {
    const arrayOfNums = [];

    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 6);
      arrayOfNums.push(num);
    }
    return arrayOfNums;
  };

  const diceEl = dice.map((num) => <Die value={num} />);

  function handleClick(){
    setDice(allDice())
  }

  return (
    <main>
      <div className="dice-container">{diceEl}</div>
      <button className="roll-btn" onClick={handleClick}>Roll</button>
    </main>
  );
}

export default App;
