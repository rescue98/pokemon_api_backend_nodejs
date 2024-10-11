# Pokemon_p
El siguiente proyecto cumple ciertas funcionalidades, utilizando la API https://pokeapi.co, la cual contiene una base de datos de Pokemon. El siguiente proyecto/código pertenece a ControlGroup. En este caso, se muestra un ejemplo de la parte api hecha con NodeJS

# Pokémon API

Este proyecto es una API para gestionar Pokémon, implementada en dos tecnologías: **NodeJs**. La API permite realizar operaciones básicas como listar Pokémon, capturarlos, liberarlos, y gestionar un registro de Pokémon capturados.
Esta es una API RESTful para gestionar Pokémon, construida utilizando Node.js y SQLite. Permite listar, capturar y liberar Pokémon, así como importar datos desde un archivo JSON.

## Clonar el Repositorio

Para clonar el repositorio en tu máquina local, sigue estos pasos:

1. **Abre la Terminal o CMD**.
2. **Ejecuta el siguiente comando** para clonar el repositorio:
   git clone https://github.com/tu_usuario/pokemon_api_backend_nodejs.git
3. git branch -a -> verificar las ramas disponibles
4. cd "carpeta proyecto"
5. git checkout develop

Con esto, ya puedes ver el código y realizar cambios si así lo requiere.

## Estructura de Ramas

Este repositorio sigue la estrategia de **Git Flow**, donde las funcionalidades se desarrollan en ramas separadas y se integran a la rama `develop`. Esto es una buena práctica por varias razones:

1. **Seguridad**: Mantener la rama `main` limpia y libre de errores potenciales. La rama `develop` actúa como un entorno de pruebas, permitiendo detectar y corregir errores antes de que el código se fusione a `main`.

2. **Organización**: Facilita la gestión de diferentes versiones y características del proyecto. Cada nueva funcionalidad se desarrolla en su propia rama y se fusiona a `develop` una vez completada.

3. **Colaboración**: Permite que múltiples desarrolladores trabajen en diferentes características simultáneamente sin interferir con el trabajo de los demás. 

4. **Despliegue**: Se puede configurar un proceso de integración continua (CI) para automatizar pruebas en la rama `develop` antes de realizar el despliegue en `main`.


## Estructura del Proyecto

plaintext
pokemon-api-nodejs/
│
├── config/
│   └── database.js         # Configuración de la base de datos SQLite
│
├── controllers/
│   └── pokemonController.js # Lógica de negocio para manejar Pokémon
│
├── models/
│   └── pokemon.js          # Modelo de datos para Pokémon
│
├── routes/
│   └── pokemonRoutes.js     # Rutas de la API para manejar peticiones
│
├── data/
│   └── pokemons.json        # Archivo JSON para importar Pokémon
│
├── index.js                 # Archivo principal para iniciar el servidor
├── package.json              # Archivo de configuración del proyecto
└── README.md                # Documentación del proyecto

### Probar API en loclhost y terminal.

#Servidor-locahost

Para poder probar el codigo en localhost se tiene que utilizar el comando "server.js" ya que aquí se configuró la funcionalidad para correr automaticamente el código en localhost sin que interrumpiera las otras clases.

#Listar pokemones: /pokemons

#Capturar pokemón usando ID: /pokemons/ID/capture

#Pokemon capturado: localhost:3000/captured

#Liberar pokemon: /pokemons/ID/release

#Importar pokemon: localhost:3000/import

#Menú interactivo

Para poder probar la api, se creo un menú interactivo con opciones. Para poder correr el código se puede ingresar desde la misma terminal de Visual Studio Code o framework que se utilizó el comando node index.js. 

Al seleccionar esto, se mostrarán las opciones y las funcionalidades correspondientes.
