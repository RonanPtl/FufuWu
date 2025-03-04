const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Modèle Tournament
const tournamentSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  participants: [
    {
      name: String,
      image_url: String,
      stats: Object,
    },
  ],
});

const Tournament = mongoose.model('Tournament', tournamentSchema);


app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await Tournament.find(); // Récupère tous les tournois depuis la base de données
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});


// Route pour obtenir les tournois
app.get('/api/tournaments/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournoi non trouvé" });
    }
    res.json(tournament);
  } catch (error) {
    console.error("Erreur serveur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
