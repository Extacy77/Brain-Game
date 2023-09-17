import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

//Array of card objects
const cardImages = [
  { src: "/img/ballerina-cat.png", matched: false },
  { src: "img/bee.png", matched: false },
  { src: "img/dog.png", matched: false },
  { src: "img/chicken.png", matched: false },
  { src: "/img/fox.png", matched: false },
  { src: "/img/frog.png", matched: false },
  { src: "/img/giraffe.png", matched: false },
  { src: "/img/lion.png", matched: false },
  { src: "/img/owl.png", matched: false },
  { src: "/img/polar-bear.png", matched: false },
  { src: "/img/pugs.png", matched: false },
  { src: "/img/rabbit.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Picture Match</h1>
      <p>
        Test your memory with this fun matching pairs game. Select two of the
        cards by tapping on it, if the cards are not a match they will cover up
        again.
        <br />
        Remember what is on the card so you can find all the matching pairs.
      </p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
