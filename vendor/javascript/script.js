// File script.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost:27017/berto_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connessione al database avvenuta con successo');
    })
    .catch((error) => {
        console.error('Errore durante la connessione al database:', error);
    });

// Middleware per il parsing dei dati JSON
app.use(bodyParser.json());

// Endpoint per la registrazione di un nuovo utente
app.post('/register', async (req, res) => {
    const { nickname, password } = req.body;

    // Verifica se il nickname è già presente nel database
    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
        return res.status(400).send('Il nickname è già in uso');
    }

    // Crea un nuovo utente
    const newUser = new User({ nickname, password });
    await newUser.save();

    res.status(201).send('Utente registrato con successo');
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
