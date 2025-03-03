import React from 'react';
import { useLocation } from 'react-router-dom';

const Winner = () => {
  const location = useLocation();
  const { winner } = location.state || { winner: 'Unknown' };

  return (
    <div>
      <h1>Winner</h1>
      <p>The winner of the tournament is {winner}!</p>
    </div>
  );
};

export default Winner;
