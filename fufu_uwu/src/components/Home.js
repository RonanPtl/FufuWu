import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tournaments')
      .then(response => {
        console.log('Tournois récupérés:', response.data); // <-- Ajoute ce log
        setTournaments(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des tournois:', error);
      });
  }, []);
  

  const startTournament = (tournamentId) => {
    console.log('ID du tournoi sélectionné:', tournamentId); // Journalisation de l'ID
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div>
      <h1>Liste des Tournois</h1>
      {tournaments.length === 0 ? (
        <p>Aucun tournoi trouvé.</p>
      ) : (
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament._id}>
              {tournament.name}
              <button onClick={() => startTournament(tournament._id)}>Commencer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default Home;
