const db = require('./db/database');

const createTableAndSeedData = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS pokemons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      types TEXT,
      capture_status BOOLEAN,
      image TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Table created.");

      const pokemons = [
        {
          name: 'Bulbasaur',
          types: 'grass, poison',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/1.png'
        },
        {
          name: 'Ivysaur',
          types: 'grass, poison',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/2.png'
        },
        {
          name: 'Venusaur',
          types: 'grass, poison',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/3.png'
        },
        {
          name: 'Charmander',
          types: 'fire',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/4.png'
        },
        {
          name: 'Charmeleon',
          types: 'fire',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/5.png'
        },
        {
          name: 'Charizard',
          types: 'fire, flying',
          capture_status: false,
          image: 'https://pokeapi.co/media/sprites/pokemon/6.png'
        },
      ];

      
      const stmt = db.prepare(`INSERT INTO pokemons (name, types, capture_status, image) VALUES (?, ?, ?, ?)`);
      pokemons.forEach(pokemon => {
        stmt.run(pokemon.name, pokemon.types, pokemon.capture_status, pokemon.image);
      });
      stmt.finalize(() => {
        console.log("Pokémon data inserted.");
        db.close(); 
      });
    });
  });
};

createTableAndSeedData();
