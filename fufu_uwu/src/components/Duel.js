import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Duel = () => {
  const { duelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialisation de l'état du tournoi
  const [tournamentState, setTournamentState] = useState(location.state || {
    rounds: [],
    currentRound: 0,
    currentDuel: 0,
  });

  // État pour stocker le duel actuel
  const [duel, setDuel] = useState(null);

  // Effect pour charger les duels à chaque fois que l'état du tournoi change
  useEffect(() => {
    console.log("État du tournoi :", tournamentState);

    // Vérification que les rounds existent avant d'accéder aux données
    if (
      tournamentState.rounds.length > 0 &&
      tournamentState.rounds[tournamentState.currentRound] &&
      tournamentState.rounds[tournamentState.currentRound][tournamentState.currentDuel]
    ) {
      setDuel(tournamentState.rounds[tournamentState.currentRound][tournamentState.currentDuel]);
    } else {
      setDuel(null);
    }
  }, [duelId, tournamentState]);

  // Fonction pour randomiser les gagnants et créer le prochain round
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
    }
    return array;
  };

  const selectWinner = (winner) => {
    const updatedRounds = [...tournamentState.rounds];
    updatedRounds[tournamentState.currentRound][tournamentState.currentDuel].winner = winner;

    // Vérifier s'il reste des duels dans ce round
    if (tournamentState.currentDuel + 1 < updatedRounds[tournamentState.currentRound].length) {
      // Passer au duel suivant dans le même round
      setTournamentState((prevState) => ({
        ...prevState,
        rounds: updatedRounds,
        currentDuel: prevState.currentDuel + 1,
      }));

      navigate(`/duel/${parseInt(duelId) + 1}`, {
        state: { ...tournamentState, rounds: updatedRounds, currentDuel: tournamentState.currentDuel + 1 },
      });
    } else {
      // Créer le prochain round avec les gagnants
      const winners = updatedRounds[tournamentState.currentRound].map(duel => duel.winner);
      const shuffledWinners = shuffleArray(winners); // Mélanger les gagnants pour randomiser les duels

      const nextRound = [];
      for (let i = 0; i < shuffledWinners.length; i += 2) {
        if (shuffledWinners[i + 1]) {
          nextRound.push({
            participant1: shuffledWinners[i],
            participant2: shuffledWinners[i + 1],
          });
        }
      }

      // Vérifier si c'est le dernier duel du tournoi
      if (nextRound.length === 1) {
        navigate('/winner', { state: { winner: nextRound[0].participant1 } });
      } else {
        setTournamentState({
          rounds: [...updatedRounds, nextRound],
          currentRound: tournamentState.currentRound + 1,
          currentDuel: 0,
        });

        navigate('/duel/0', {
          state: { rounds: [...updatedRounds, nextRound], currentRound: tournamentState.currentRound + 1, currentDuel: 0 },
        });
      }
    }
  };

  if (!duel) {
    console.log("Aucun duel trouvé !");
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Duel {duelId}</h1>
      <p>{duel.participant1.name} vs {duel.participant2.name}</p>
      <button onClick={() => selectWinner(duel.participant1.name)}>Sélectionner {duel.participant1.name}</button>
      <button onClick={() => selectWinner(duel.participant2.name)}>Sélectionner {duel.participant2.name}</button>
    </div>
  );
};

export default Duel;
