import { useState } from "react"

const TURNS = {
  X : 'x',
  O : 'o'
}

const combinacionesGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6]             // Diagonales
];


const Square = ({children, updateBoard, index, isSelected})=>{
  const handleClick = ()=>{
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={`square ${isSelected ? 'is-selected' : ''}`}>
      {children}
    </div>
  )
}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) =>{
    if(board[index]) return    

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const ganador = checkWinnner(newBoard)

    if(ganador){
      setWinner(ganador)
    }

   
  }

  const checkWinnner = (tablero)=>{
    for (let combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {        
        return tablero[a]; // Devuelve el símbolo del ganador (X o O)
      }
    }

    if (!tablero.includes(null)) {
      return setWinner(false)
    }
    return null; // No hay ganador
  
  }

  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <main className="board">
      <h1>Ta-Te-Ti</h1>
      <section className="game">                    
          {board.map((_, index)=>{
               return (
                <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {_}
              </Square>
               )
            })}          
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              {winner === false
              ? 'Hubo Empate'
              : 'El ganador es:' 
              }
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>

          </section>
        )
      }

    </main>
  )
}

export default App
