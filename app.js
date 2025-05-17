const express = require('express');
require('dotenv').config();

const guardarRouter = require('./routes/guardar');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para leer JSON en los requests
app.use(express.json());

// Ruta para guardar datos
app.use('/api', guardarRouter);

// Ruta para chequear que el servidor está activo (opcional)
app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
