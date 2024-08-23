const express = require('express');
const bodyParser = require('body-parser');
const caloriasRoutes = require('./routes/caloriasRoutes');

const app = express();
const port = 3000; // O el puerto que estés utilizando

app.use(bodyParser.json());
app.use('/api', caloriasRoutes); // Usa el prefijo '/api' para todas las rutas definidas en caloriasRoutes

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

