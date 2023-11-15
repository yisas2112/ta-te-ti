import { useState } from "react"

const TURN = {
  X : 'x',
  O : 'o'
}


const Square = ({children, updateBoard, index, isSelected})=>{
  const handleClick = ()=>{
    updateBoard()
  }
  return (
    <div onClick={handleClick} className={`square ${isSelected ? 'is-selected' : ''}`}>
      {children}
    </div>
  )
}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURN.X)

  const updateBoard = () =>{

  }
  return (
    <main className="board">
      <h1>Ta-Te-Ti</h1>
      <section className="game">
          {
            board.map((_, index)=>{
               return (
                <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {index}
              </Square>
               )
            })
          }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn == TURN.O}>{TURN.O}</Square>
      </section>
    </main>
  )
}

export default App
