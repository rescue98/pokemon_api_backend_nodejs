const sqlite3 = require('sqlite3').verbose();

class Pokemon {
  static db;

  static connect() {
    this.db = new sqlite3.Database('./db/pokemon.db', (err) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
      } else {
        console.log("Conectado a la base de datos.");
      }
    });
  }

  static createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY,
        name TEXT,
        types TEXT,
        capture_status INTEGER DEFAULT 0,
        sprite TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(sql, (err) => {
      if (err) {
        console.error("Error al crear la tabla:", err.message);
      } else {
        console.log("Tabla creada o ya existe.");
      }
    });
  }

  // Método para insertar Pokémon
  static insert(name, types, capture_status, sprite) {
    const sql = `INSERT INTO pokemons (name, types, capture_status, sprite) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, [name, types, capture_status, sprite], function(err) {
        if (err) {
          return reject(err);
        }
        resolve(`Pokémon ${name} agregado con ID ${this.lastID}.`);
      });
    });
  }

  // Método para capturar Pokémon
  static capture(id) {
    const sql = `UPDATE pokemons SET capture_status = 1 WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], function(err) {
        if (err) {
          return reject(err);
        }
        if (this.changes === 0) {
          return reject(new Error("Pokémon no encontrado."));
        }
        resolve(`Pokémon con ID: ${id} capturado.`);
      });
    });
  }

  // Método para obtener Pokémon capturados
  static getCaptured() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pokemons WHERE capture_status = 1`;
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Método para contar Pokémon
  static getCount(nameFilter = '', typeFilter = '') {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) as count FROM pokemons WHERE name LIKE ? AND types LIKE ?`;
      this.db.get(sql, [`%${nameFilter}%`, `%${typeFilter}%`], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row.count);
      });
    });
  }

  // Método para obtener todos los Pokémon
  static getAll(page, nameFilter = '', typeFilter = '') {
    return new Promise((resolve, reject) => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const sql = `SELECT * FROM pokemons WHERE name LIKE ? AND types LIKE ? LIMIT ? OFFSET ?`;
      this.db.all(sql, [`%${nameFilter}%`, `%${typeFilter}%`, limit, offset], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Método para limpiar la tabla (borrar todos los Pokémon)
  static clear() {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM pokemons`;
      this.db.run(sql, function(err) {
        if (err) {
          return reject(err);
        }
        resolve("Todos los Pokémon han sido eliminados.");
      });
    });
  }
}

Pokemon.connect();

module.exports = Pokemon;
