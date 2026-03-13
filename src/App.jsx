import { useGameLogic } from "./hooks/useGameLogic";
import Card from "./components/Card";
import GameHeader from "./components/GameHeader";
import WinMessage from "./components/WinMessage";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const  {cards, score, moves, hasWon, initializeGame, handleCardClick} = useGameLogic(cardValues)

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      
        {hasWon && <WinMessage score={score} moves={moves} onReset={initializeGame} />}
       
        <div className="cards-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onclick={handleCardClick} />
          ))}
        </div>
      
    </div>
  );
}

export default App
