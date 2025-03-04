import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/style.css'; // Importez le CSS

const Home = () => {
  return (
    <div className="home container">
      <h1>Bienvenue sur l'application de tournois !</h1>
      <p>Commencez par créer un nouveau tournoi ou consultez les tournois existants.</p>

      <Link to="/create-tournament">
        <button>Créer un nouveau tournoi</button>
      </Link>

      <Link to="/tournaments">
        <button>Voir les tournois existants</button>
      </Link>
    </div>
  );
};

export default Home;