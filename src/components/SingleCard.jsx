import React from 'react';
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        !disabled && handleChoice(card);
    }

  return (
          <div className="card" >
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front" />
              <img 
              className="back"
              onClick={handleClick} 
               src="./img/butterflies.jpg" 
               alt="card back" />
            </div>
            </div>
  )
}
   

export default SingleCard;
