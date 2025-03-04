import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tournament = () => {
  const { id } = useParams(); // Récupère l'ID du tournoi dans l'URL
  const [tournament, setTournament] = useState(null); // État pour stocker les données du tournoi
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [duels, setDuels] = useState([]); // État pour stocker les duels générés
  const navigate = useNavigate();

  // Fonction pour mélanger les participants (algorithme de Fisher-Yates)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
    }
    return array;
  };

  // Fonction pour créer des duels à partir des participants mélangés
  const createDuels = (participants) => {
    const duels = [];
    for (let i = 0; i < participants.length; i += 2) {
      if (participants[i + 1]) {
        duels.push({
          participant1: participants[i],
          participant2: participants[i + 1],
        });
      }
    }
    return duels;
  };

  // Récupération des données du tournoi à partir de l'API
  useEffect(() => {
    console.log('ID du tournoi:', id);
    axios.get(`http://localhost:5000/api/tournaments/${id}`)
      .then(response => {
        console.log('Réponse de l\'API:', response.data);
        setTournament(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du tournoi:', error);
        setError('Impossible de charger le tournoi.');
      });
  }, [id]);

  // Fonction pour lancer le tournoi et générer les duels
  const startTournament = () => {
    if (tournament.participants.length < 2) {
      alert('Le tournoi doit avoir au moins 2 participants.');
      return;
    }

    const shuffledParticipants = shuffleArray([...tournament.participants]); // Mélanger les participants
    const randomizedDuels = createDuels(shuffledParticipants); // Créer les duels à partir des participants mélangés
    setDuels(randomizedDuels); // Mettre à jour l'état avec les duels générés

    // Initialiser les rounds
    const rounds = [randomizedDuels];
    setTournament(prevState => ({
      ...prevState,
      rounds: rounds,
      currentRound: 0,
      currentDuel: 0
    }));

    navigate(`/duel/0`, { state: { rounds, currentRound: 0, currentDuel: 0 } });
  };

  // Affichage des données du tournoi ou d'une erreur
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

      {/* Afficher les participants */}
      <h4>Participants :</h4>
      <ul>
        {tournament.participants && tournament.participants.map((participant, index) => (
          <li key={index}>{participant.name}</li>
        ))}
      </ul>

      {/* Bouton pour démarrer le tournoi */}
      <button onClick={startTournament}>Lancer le tournoi</button>
    </div>
  );
};

export default Tournament;
