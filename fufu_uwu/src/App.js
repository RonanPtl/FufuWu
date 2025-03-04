import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Tournament from './components/Tournament';
import Duel from './components/Duel';
import Winner from './components/Winner';
import CreateTournament from './components/CreateTournament';
import TournamentsList from './components/TournamentsList'; // Importez la nouvelle page



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament/:id" element={<Tournament />} />
        <Route path="/duel/:duelId" element={<Duel />} />
        <Route path="/winner" element={<Winner />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/tournaments" element={<TournamentsList />} /> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
