import pokemonList from '../data/pokemonsList.js';
import express from 'express';
import Pokemon from '../models/pokemon.js';

const router = express.Router();

router.get('/api/pokemons', async (req, res) => {
    try {
        const pokemon = await Pokemon.find();
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/pokemons/:id', async (req, res) => {
    try {
        const pokemonId = await Pokemon.findOne({ id: req.params.id });
        res.status(200).json(pokemonId);
    } catch (error) {
        res.status(404).json({ error: 'Pokemon not found' });
    }
});

router.post('/api/pokemons', async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body);
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).json({ error: 'Le pokemon n\'a pas pu être créé' });
    }
});

router.put('/api/pokemons/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedPokemon) {
            res.status(200).json(updatedPokemon);
        } else {
            res.status(404).json({ error: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Le pokemon n\'a pas pu être mis à jour' });
    }
});

router.delete('/api/pokemons/:id', async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
        if (deletedPokemon) {
            res.status(204).json({ message: 'Pokemon deleted successfully' });
        } else {
            res.status(404).json({ error: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Le pokemon n\'a pas pu être supprimé' });
    }
});

export default router;
