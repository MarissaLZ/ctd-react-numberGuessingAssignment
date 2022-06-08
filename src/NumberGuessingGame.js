import React, { useState, useEffect } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const MAX_ATTEMPTS = 5;
let numberToGuess = getRandomNumber();

function NumberGuessingGame() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [latestGuess, setLatestGuess] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = (guess) => {
    setLatestGuess(guess);
    setNumberOfGuesses(numberOfGuesses + 1);
  };

  const handleReset = () => {
    numberToGuess = getRandomNumber();
    setNumberOfGuesses(0);
    setLatestGuess(null);
    setIsCorrectGuess(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (latestGuess === numberToGuess) {
      setIsCorrectGuess(true);
    }
    if (isCorrectGuess || numberOfGuesses === MAX_ATTEMPTS) {
      setIsGameOver(true);
    }
  }, [latestGuess, isCorrectGuess, numberOfGuesses]);

  return (
    <div>
      <h2>I'm thinking of a number from 1 to 100.</h2>
      <h2>Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?</h2>
      <GuessControl onGuess={handleGuess} />
      {isGameOver && <GameOver hasWon={isCorrectGuess} onReset={handleReset} />}
      {!isGameOver && <GuessMessage guess={latestGuess} numberToGuess={numberToGuess} numberOfGuesses={numberOfGuesses} />}
    </div>
  );
}

export default NumberGuessingGame;