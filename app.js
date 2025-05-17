const express = require('express');
const app = express();
require('dotenv').config();

const guardarRuta = require('./routes/guardar');

app.use(express.json());
app.use('/api/guardar', guardarRuta);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
