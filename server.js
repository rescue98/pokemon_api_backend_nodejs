const express = require('express');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemon');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/pokemons', pokemonRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
