import "./style.css";
import Die from "./components/Die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allDice());
  const [tenzies, setTenzies] = useState(false);
  const [isRolling, setIsRolling] = useState(true);
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    const allHeldDice = dice.every((die) => die.isHeld);
    const firstVal = dice[0].value;
    const allSameVal = dice.every((die) => die.value === firstVal);
    if (allHeldDice && allSameVal) {
      setTenzies(true);
    }
  }, [dice]);

  function allDice() {
    const arrayOfNums = [];

    for (let i = 0; i < 10; i++) {
      let num = Math.ceil(Math.random() * 6);
      arrayOfNums.push({ value: num, isHeld: false, id: nanoid() });
    }
    return arrayOfNums;
  }

  function holdDice(id) {
    setDice((prevVal) =>
      prevVal.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceEl = dice.map((num) => (
    <Die
      isHeld={num.isHeld}
      key={num.id}
      value={num.value}
      id={num.id}
      holdDice={() => holdDice(num.id)}
    />
  ));

  function rollDice() {
    setTimeout(() => {
      setIsRolling(true);
    }, 1000);
    setIsRolling(false);

    if (!tenzies) {
      setDice((prevVal) =>
        prevVal.map((die) => {
          if (die.isHeld) {
            return die;
          } else
            return {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            };
        })
      );
      increaseRollCount()
    } else {
      setTenzies(false);
      setDice(allDice());
      setRollCount(0)
    }
  }

  function increaseRollCount(){
    setRollCount((prevResult)=> prevResult +=1)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">TENZIES</h1>

      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats">
        <p>Rolls:{rollCount}</p>
        <p>Timer:</p>
      </div>
      {!isRolling ? (
        <h1 style={{fontSize: 50}}>Rolling...</h1>
      ) : (
        <div className="dice-container"> {diceEl}</div>
      )}
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
