import React from 'react';
import { useLocation } from 'react-router-dom';

const Winner = () => {
  const location = useLocation();
  const { winner } = location.state || {};

  if (!winner) {
    return <div>Chargement du gagnant...</div>;
  }

  return (
    <div>
      <h1>Le gagnant du tournoi est {winner}</h1>
    </div>
  );
};

export default Winner;
