const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Corregido a '../database/db'

// Endpoint para añadir una nueva entrada
router.post('/add-caloria', async (req, res) => {
  const { tipo, cantidad } = req.body;
  try {
    const result = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO calorias (tipo, cantidad) VALUES (?, ?)`, [tipo, cantidad], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
    res.status(201).json({ id: result.lastID, tipo, cantidad });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener todas las entradas
router.get('/calorias', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM calorias`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para obtener una entrada por ID
router.get('/calorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const row = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM calorias WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    if (!row) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
