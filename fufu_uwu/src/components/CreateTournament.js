import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../styles/style.css'; // Importez le CSS

const CreateTournament = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');
  const navigate = useNavigate();

  const addParticipant = () => {
    if (newParticipant.trim() !== '') {
      setParticipants([...participants, { name: newParticipant }]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const createTournament = async () => {
    if (tournamentName.trim() === '' || participants.length < 2) {
      alert('Veuillez donner un nom au tournoi et ajouter au moins 2 participants.');
      return;
    }

    const tournamentData = {
      name: tournamentName,
      description: 'Un nouveau tournoi passionnant !',
      participants: participants,
    };

    console.log('Données envoyées à l\'API :', tournamentData); // Log pour déboguer

    try {
      const response = await axios.post('http://localhost:5000/api/tournaments', tournamentData);
      console.log('Réponse de l\'API :', response.data); // Log pour déboguer
      navigate(`/tournament`);
    } catch (error) {
      console.error('Erreur lors de la création du tournoi :', error);
      if (error.response) {
        console.error('Réponse de l\'API :', error.response.data); // Log pour déboguer
      }
      alert('Une erreur est survenue lors de la création du tournoi.');
    }
  };

  return (
    <div className="create-tournament container">
      <h1>Créer un nouveau tournoi</h1>

      <div>
        <label>Nom du tournoi :</label>
        <input
          type="text"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Entrez le nom du tournoi"
        />
      </div>

      <div>
        <label>Ajouter un participant :</label>
        <input
          type="text"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Entrez le nom du participant"
        />
        <button onClick={addParticipant}>Ajouter</button>
      </div>

      <div>
        <h3>Participants :</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>
              {participant.name}
              <button onClick={() => removeParticipant(index)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={createTournament}>Créer le tournoi</button>


      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default CreateTournament;