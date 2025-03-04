import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './../styles/style.css'; // Importez le CSS


const Winner = () => {
  const location = useLocation();
  const { winner } = location.state || { winner: 'Unknown' };

  return (
    <div>
      <h1>Winner</h1>
      <p>The winner of the tournament is {winner.name}!</p>


      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default Winner;