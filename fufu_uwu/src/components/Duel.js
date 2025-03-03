import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const Duel = () => {
  const { duelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [duel, setDuel] = useState(null);
  const [tournamentState, setTournamentState] = useState(location.state || {
    rounds: [],
    currentRound: 0,
    currentDuel: 0,
  });

  useEffect(() => {
    // Fetch duel data based on the current state
    const currentDuel = tournamentState.rounds[tournamentState.currentRound][tournamentState.currentDuel];
    setDuel(currentDuel);
  }, [duelId, tournamentState.currentRound, tournamentState.currentDuel]);

  const selectWinner = (winner) => {
    const updatedRounds = [...tournamentState.rounds];
    updatedRounds[tournamentState.currentRound][tournamentState.currentDuel].winner = winner;

    // Check if this is the last duel of the round
    if (tournamentState.currentDuel + 1 < updatedRounds[tournamentState.currentRound].length) {
      // Move to the next duel in the same round
      setTournamentState({
        ...tournamentState,
        rounds: updatedRounds,
        currentDuel: tournamentState.currentDuel + 1,
      });
      navigate(`/duel/${parseInt(duelId) + 1}`, { state: { ...tournamentState, rounds: updatedRounds, currentDuel: tournamentState.currentDuel + 1 } });
    } else {
      // Prepare the next round with the winners
      const nextRound = [];
      for (let i = 0; i < updatedRounds[tournamentState.currentRound].length / 2; i++) {
        nextRound.push({
          participant1: updatedRounds[tournamentState.currentRound][2 * i].winner,
          participant2: updatedRounds[tournamentState.currentRound][2 * i + 1].winner,
        });
      }

      // Check if there is only one winner left
      if (nextRound.length === 1) {
        // Navigate to the winner page
        navigate('/winner', { state: { winner: nextRound[0].participant1 } });
      } else {
        setTournamentState({
          rounds: [...updatedRounds, nextRound],
          currentRound: tournamentState.currentRound + 1,
          currentDuel: 0,
        });
        navigate('/duel/0', { state: { rounds: [...updatedRounds, nextRound], currentRound: tournamentState.currentRound + 1, currentDuel: 0 } });
      }
    }
  };

  if (!duel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Duel {duelId}</h1>
      <p>{duel.participant1} vs {duel.participant2}</p>
      <button onClick={() => selectWinner(duel.participant1)}>Select {duel.participant1}</button>
      <button onClick={() => selectWinner(duel.participant2)}>Select {duel.participant2}</button>
    </div>
  );
};

export default Duel;
