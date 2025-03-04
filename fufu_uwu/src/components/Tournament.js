import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../styles/style.css'; // Importez le CSS


const Tournament = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(null);
  const [duels, setDuels] = useState([]);
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createDuels = (participants) => {
    const duels = [];
    for (let i = 0; i < participants.length; i += 2) {
      if (participants[i + 1]) {
        duels.push({
          participant1: participants[i],
          participant2: participants[i + 1],
        });
      } else {
        duels.push({
          participant1: participants[i],
          participant2: null, // Gestion des duels impairs
        });
      }
    }
    return duels;
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tournaments/${id}`)
      .then(response => {
        setTournament(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du tournoi:', error);
        setError('Impossible de charger le tournoi.');
      });
  }, [id]);

  const startTournament = () => {
    if (tournament.participants.length < 2) {
      alert('Le tournoi doit avoir au moins 2 participants.');
      return;
    }

    const shuffledParticipants = shuffleArray([...tournament.participants]);
    const randomizedDuels = createDuels(shuffledParticipants);
    setDuels(randomizedDuels);

    // Naviguer vers le premier duel
    navigate('/duel/0', { state: { rounds: [randomizedDuels], currentRound: 0, currentDuel: 0 } });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!tournament) {
    return <div>Chargement du tournoi...</div>;
  }

  return (
    <div>
      <h1>{tournament.name}</h1>
      <h3>{tournament.description}</h3>
      
      <h4>Participants :</h4>
      <ul>
        {tournament.participants && tournament.participants.map((participant, index) => (
          <li key={index}>{participant.name}</li>
        ))}
      </ul>

      <button onClick={startTournament}>Lancer le tournoi</button>

      {duels.length > 0 && (
        <div>
          <h4>Duels :</h4>
          <ul>
            {duels.map((duel, index) => (
              <li key={index}>
                {duel.participant1.name} vs {duel.participant2 ? duel.participant2.name : 'Bye'}
              </li>
            ))}
          </ul>
        </div>
      )}


      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default Tournament;