import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../styles/style.css'; // Importez le CSS


const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer la liste des tournois depuis l'API
  useEffect(() => {
    axios.get('http://localhost:5000/api/tournaments')
      .then(response => {
        setTournaments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des tournois :', error);
        setError('Impossible de charger les tournois.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des tournois existants</h1>

      {/* Afficher la liste des tournois */}
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <Link to={`/tournament/${tournament._id}`}>
              {tournament.name} - {tournament.participants.length} participants
            </Link>
          </li>
        ))}
      </ul>

      {/* Lien pour revenir à la page d'accueil */}
      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default TournamentsList;