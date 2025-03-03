import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const tournaments = [
    { id: 1, name: 'Tournoi A' },
    { id: 2, name: 'Tournoi B' },
    { id: 3, name: 'Tournoi C' },
  ];

  const startTournament = (tournamentId) => {
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div>
      <h1>Liste des Tournois</h1>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            {tournament.name}
            <button onClick={() => startTournament(tournament.id)}>Commencer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
