import Die from "./components/Die.jsx"
import React, { useEffect } from "react"
import Confetti from "react-confetti"
export default function App() {

  let [values, setValues] = React.useState(() => generateAllNewDice())
  let gameWon = values.every(value => value.isHeld) &&
    values.every(value => value.value === values[0].value)
  const rollButtonRef = React.useRef(null)

  function generateAllNewDice() {
    let diceValues = []
    for (let i = 0; i < 10; i++) {
      diceValues.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: i
        })
    }
    return diceValues
  }

  function hold(id) {
    setValues(prevValues => prevValues.map((die) =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  function getNewDice() {
    setValues(prevValues => prevValues.map((die) => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
    ))
  }

  const diceElements = values.map(die => <Die hold={hold} value={die.value} key={die.id} id={die.id} isHeld={die.isHeld} />)

  function getNewGame() {
    setValues(generateAllNewDice())
  }

  React.useEffect(() => {
    if (gameWon) {
      rollButtonRef.current.focus()
    }
  }, [gameWon])


  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>

      <button ref={rollButtonRef} className="roll" onClick={gameWon ? getNewGame : getNewDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>

    </main>
  )
}