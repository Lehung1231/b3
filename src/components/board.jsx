import { useState } from "react"
import Square from './square'

const Board = ({ children }) => {
    const [game, setGame] = useState([null, null, null, null, null, null, null, null, null])
    const [player, setPlayer] = useState(true)
    const [history, setHistory] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [undoCount, setUndoCount] = useState(0)

    const handlePlay = (position) => {
        const winner = checkWinner();
        if (winner || gameOver) return;       
        const newGame = game.map((g, index) => {
          if (index === position) {
            return player ? "X" : "O";
          }
          return g;
        });  
        setHistory([...history, game]);
        setGame(newGame);
        setPlayer(!player);
        setUndoCount(0); 
        if (winner) {
          setGameOver(true);  
        }
      }
      
    const handleUndo = () => {
        if (history.length > 0 && undoCount < 1) {
            const lastMove = history[history.length - 1];
            setGame(lastMove);
            setHistory(history.slice(0, history.length - 1));
            setPlayer(!player);
            setUndoCount(undoCount + 1);
        }
    }

    const chon = () =>{
      return player ? "X" : "O";
    }

    const listWinner = [
        [0,1,2], [0,4,8],[0,3,6],[3,4,5],[6,7,8],[2,4,6],[1,4,7],[2,5,8]
    ]
    
    const checkWinner = () => {
        for (let i = 0; i < listWinner.length; i++) {
            const [p1, p2, p3] = listWinner[i];
            if (game[p1] === game[p2] && game[p2] === game[p3]) {
                return game[p1];
            }
        }
        if (game[0] && game[1] && game[2] && game[3] && game[4] && game[5] && game[6] && game[7] && game[8]) {
            return 'Hòa';
        }
        return null;
    }

    const reset = () => {
        setGame([null, null, null, null, null, null, null, null, null]);
        setHistory([]);
        setGameOver(false);
    }

    return (
        <>  <h2 className="text-blue-600/100 mt-10 mb-10 text-2xl">Turn: {chon()}</h2>
            <div>
            <button onClick={reset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reset</button>
            <button onClick={handleUndo} className="ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Quay Lại</button>
            </div>
            <h2 className="text-blue-600/100 mt-10 mb-10 text-2xl">Winner is: {checkWinner()}</h2>
            <div className="grid grid-cols-3 gap-2 w-[240px] ">
                <Square value={game[0]} position={0} handlePlay={handlePlay}/>
                <Square value={game[1]} position={1} handlePlay={handlePlay}/>
                <Square value={game[2]} position={2} handlePlay={handlePlay}/>
                <Square value={game[3]} position={3} handlePlay={handlePlay}/>
                <Square value={game[4]} position={4} handlePlay={handlePlay}/>
                <Square value={game[5]} position={5} handlePlay={handlePlay}/>
                <Square value={game[6]} position={6} handlePlay={handlePlay}/>
                <Square value={game[7]} position={7} handlePlay={handlePlay}/>
                <Square value={game[8]} position={8} handlePlay={handlePlay}/>
            </div>
        </>
    )
}

export default Board