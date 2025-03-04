import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './../styles/style.css'; // Importez le CSS


const Duel = () => {
  const { duelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [tournamentState, setTournamentState] = useState(location.state || {
    rounds: [],
    currentRound: 0,
    currentDuel: 0,
  });

  const [duel, setDuel] = useState(null);

  useEffect(() => {
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

  const selectWinner = (winner) => {
    const updatedRounds = [...tournamentState.rounds];
    updatedRounds[tournamentState.currentRound][tournamentState.currentDuel].winner = winner;

    if (tournamentState.currentDuel + 1 < updatedRounds[tournamentState.currentRound].length) {
      setTournamentState((prevState) => ({
        ...prevState,
        rounds: updatedRounds,
        currentDuel: prevState.currentDuel + 1,
      }));

      navigate(`/duel/${parseInt(duelId) + 1}`, { 
        state: { ...tournamentState, rounds: updatedRounds, currentDuel: tournamentState.currentDuel + 1 } 
      });
    } else {
      const nextRound = [];
      for (let i = 0; i < updatedRounds[tournamentState.currentRound].length; i += 2) {
        const participant1 = updatedRounds[tournamentState.currentRound][i].winner;
        const participant2 = updatedRounds[tournamentState.currentRound][i + 1]?.winner || null;
        nextRound.push({
          participant1,
          participant2,
        });
      }

      if (nextRound.length === 1 && nextRound[0].participant2 === null) {
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
      <h2>Round {tournamentState.currentRound + 1}</h2>
      <p>{duel.participant1.name} vs {duel.participant2 ? duel.participant2.name : 'Bye'}</p>
      <button onClick={() => selectWinner(duel.participant1)}>Sélectionner {duel.participant1.name}</button>
      {duel.participant2 && <button onClick={() => selectWinner(duel.participant2)}>Sélectionner {duel.participant2.name}</button>}
    </div>
  );
};

export default Duel;