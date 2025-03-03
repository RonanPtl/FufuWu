import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Tournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Générer des noms de participants différents pour chaque tournoi
  const generateParticipants = (tournamentId) => {
    const baseNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'];
    return baseNames.map((name, index) => `${name} ${tournamentId}-${index + 1}`);
  };

  const [participants] = useState(generateParticipants(id));

  const startTournament = () => {
    const firstRound = [];
    for (let i = 0; i < participants.length; i += 2) {
      firstRound.push({
        participant1: participants[i],
        participant2: participants[i + 1],
      });
    }

    const tournamentState = {
      rounds: [firstRound],
      currentRound: 0,
      currentDuel: 0,
    };

    navigate('/duel/0', { state: tournamentState });
  };

  return (
    <div>
      <h1>Tournament {id}</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
      <button onClick={startTournament}>Start Tournament</button>
    </div>
  );
};

export default Tournament;
