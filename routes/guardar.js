const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment');

router.post('/', async (req, res) => {
  try {
    const { mac_Id, x, y, z, timestamp } = req.body;

    const fechaHora = moment(Number(timestamp));
    const fecha = fechaHora.format('YYYY-MM-DD');
    const hora = fechaHora.format('HH:mm:ss');

    const dispositivoID = await obtenerDispositivoID(mac_Id);
    const usuarioID = await obtenerUsuarioID(dispositivoID);

    const sql = `
      INSERT INTO Lecturas
      (DispocitivoID, UsuarioID, Coordenada_X, Coordenada_Y, Coordenada_Z, Fecha, Hora)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [dispositivoID, usuarioID, x, y, z, fecha, hora]);

    res.status(200).json({ message: 'Lectura guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar:', error);
    res.status(500).json({ error: 'Fallo al guardar datos' });
  }
});

// Estas funciones deberías reemplazarlas más adelante con tu lógica real
async function obtenerDispositivoID(mac_Id) {
  return 1; // ID fijo por ahora
}

async function obtenerUsuarioID(dispositivoID) {
  return 1; // ID fijo por ahora
}

module.exports = router;
