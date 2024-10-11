const express = require('express');
const bodyParser = require('body-parser');
const Pokemon = require('./models/Pokemon');
const pokemonRoutes = require('./routes/pokemon');
const readline = require('readline');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/pokemons', pokemonRoutes);

Pokemon.createTable();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  startMenu();
});

function startMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("\n--- Pokémon API Menu ---");
  console.log("1. Listar Pokémon");
  console.log("2. Capturar Pokémon");
  console.log("3. Listar Pokémon Capturados");
  console.log("4. Liberar Pokémon");
  console.log("5. Importar Pokémon");
  console.log("0. Salir");

  rl.question("Seleccione una opción: ", async (option) => {
    switch (option) {
      case '1':
        await listPokemons();
        break;
      case '2':
        await capturePokemon();
        break;
      case '3':
        await listCapturedPokemons();
        break;
      case '4':
        await releasePokemon();
        break;
      case '5':
        await importPokemons();
        break;
      case '0':
        console.log("Saliendo...");
        rl.close();
        process.exit(0);
      default:
        console.log("Opción no válida. Intente nuevamente.");
        break;
    }
    startMenu(); 
  });
}

async function listPokemons() {
  const page = parseInt(await askQuestion("Ingrese el número de página: ")) || 1;
  const nameFilter = await askQuestion("Ingrese el nombre del Pokémon (deje vacío para no filtrar): ");
  const typeFilter = await askQuestion("Ingrese el tipo del Pokémon (deje vacío para no filtrar): ");

  const totalPokemons = await Pokemon.getCount(nameFilter, typeFilter);
  const totalPages = Math.ceil(totalPokemons / 10);
  const pokemons = await Pokemon.getAll(page, nameFilter, typeFilter);

  console.log("\n--- Pokémon List ---");
  pokemons.forEach(pokemon => {
    console.log(`ID: ${pokemon.id}, Nombre: ${pokemon.name}, Tipos: ${pokemon.types}, Estado: ${pokemon.capture_status ? 'Capturado' : 'No Capturado'}`);
  });
  console.log(`Página: ${page}, Total Páginas: ${totalPages}, Total Pokémon: ${totalPokemons}`);
}

async function capturePokemon() {
  const id = await askQuestion("Ingrese el ID del Pokémon a capturar: ");
  try {
    const message = await Pokemon.capture(id);
    console.log(message);
  } catch (error) {
    console.error("Error al capturar el Pokémon:", error.message);
  }
}

async function listCapturedPokemons() {
  try {
    const capturedPokemons = await Pokemon.getCaptured();
    console.log("\n--- Captured Pokémon ---");
    if (capturedPokemons.length === 0) {
      console.log("No hay Pokémon capturados.");
    } else {
      capturedPokemons.forEach(pokemon => {
        console.log(`ID: ${pokemon.id}, Nombre: ${pokemon.name}`);
      });
    }
  } catch (error) {
    console.error("Error al listar Pokémon capturados:", error.message);
  }
}

async function releasePokemon() {
  const id = await askQuestion("Ingrese el ID del Pokémon a liberar: ");
  try {
    const message = await Pokemon.release(id);
    console.log(message);
  } catch (error) {
    console.error("Error al liberar el Pokémon:", error.message);
  }
}

async function importPokemons() {
  try {
    const message = await Pokemon.clear(); 
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemons = response.data.results;

    for (const poke of pokemons) {
      const detailsResponse = await axios.get(poke.url);
      const types = detailsResponse.data.types.map(t => t.type.name).join(', ');

      await Pokemon.insert(
        detailsResponse.data.name,
        types,
        false,
        detailsResponse.data.sprites.front_default
      );
    }
    console.log("Pokémons importados correctamente.");
  } catch (error) {
    console.error("Error al importar Pokémon:", error.message);
  }
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}