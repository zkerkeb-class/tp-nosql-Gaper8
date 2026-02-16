import mongoose from 'mongoose';
import fs from 'fs';
import Pokemon from '../models/pokemon.js';
import connect from './connect.js';

const seed = async () => {
    try {
        await connect;
        const data = fs.readFileSync('./data/pokemons.json', 'utf-8');
        const pokemonsListJson = JSON.parse(data);
        await Pokemon.deleteMany({});
        await Pokemon.insertMany(pokemonsListJson);
        await Pokemon.countDocuments().then(count => {
            console.log(`Inserted ${count} pokemons into the database.`);
        });
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seed();