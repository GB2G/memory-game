// src/context/GameContext.js
import React, { createContext, useContext } from 'react';

export const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const difficulty = 'medium'; // Replace with actual state management if needed
  return (
    <GameContext.Provider value={{ difficulty }}>
      {children}
    </GameContext.Provider>
  );
};