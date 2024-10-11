const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');


router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, name, type } = req.query;
        const pokemons = await Pokemon.listPokemons(page, limit, name, type);
        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/capture/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPokemon = await Pokemon.capturePokemon(id);
        res.json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/captured', async (req, res) => {
    try {
        const capturedPokemons = await Pokemon.getCapturedPokemons();
        res.json(capturedPokemons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/destroy/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPokemon = await Pokemon.destroyPokemon(id);
        res.json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/import', async (req, res) => {
    try {
        await Pokemon.importPokemons();
        res.json({ message: "Pokémon imported successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;