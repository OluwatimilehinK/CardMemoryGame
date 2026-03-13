import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
 const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards ] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const initializeGame = () => {
    // const shuffledCards = [...cardValues].sort(() => Math.random() - 0.5);
     const shuffled = shuffleArray(cardValues)
    const finalCards = shuffled.map((value, index) => ({ id: index, value: value, isFlipped: false, isMatched: false }));

    setCards(finalCards);
    setScore(0)
    setMoves(0)
    setIsLocked(false)
    setMatchedCards([])
    setFlippedCards([])
    
  }
  

  useEffect(() => {
    initializeGame();
  }, [])




  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    const newFlippedCards = [...flippedCards, card.id];

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    // Use the updated flipped-cards array (newFlippedCards) to avoid stale state.
    if (newFlippedCards.length === 2) {
      setIsLocked(true);

      const firstCardId = newFlippedCards[0];
      const firstCard = newCards.find((c) => c.id === firstCardId);
      const secondCard = newCards.find((c) => c.id === card.id);

      if (firstCard?.value === secondCard?.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCardId, card.id]);
          setScore((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) =>
              c.id === card.id || c.id === firstCardId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlippedCards.includes(c.id)
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  }

  const hasWon = cards.length > 0 && matchedCards.length === cards.length;

  return {cards, score, moves, hasWon, initializeGame, handleCardClick}
}