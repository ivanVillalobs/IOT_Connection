const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/guardar', async (req, res) => {
  try {
    const { mac_Id, xMag, yMag, zMag, timestamp } = req.body;

    if (!mac_Id || xMag === undefined || yMag === undefined || zMag === undefined || !timestamp) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const dateObj = new Date(timestamp);
    const fecha = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = dateObj.toTimeString().split(' ')[0]; // HH:MM:SS

    const sql = `
      INSERT INTO lecturas (
        DispocitivoID,
        UsuarioID,
        Nivel,
        Coordenada_X,
        Coordenada_Y,
        Coordenada_Z,
        Fecha,
        Hora
      ) VALUES (?, NULL, NULL, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [mac_Id, xMag, yMag, zMag, fecha, hora]);

    res.status(200).json({ message: 'Datos guardados correctamente' });

  } catch (error) {
    console.error('Error al guardar en DB:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
