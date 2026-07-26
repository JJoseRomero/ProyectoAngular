const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /api/datos -> devuelve todos los registros de la tabla "datos"
app.get('/api/datos', async (req, res) => {
  //console.log('>>> Petición recibida en /api/datos');
  try {
    const [rows] = await pool.query(
      'SELECT idDato, nombreDato, edadDato, sexoDato, fechaNacimientoDato, correoDato FROM datos'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar la tabla datos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los datos' });
  }
});

// POST /api/login -> valida usuario y contraseña contra la tabla "usuarios"
app.post('/api/login', async (req, res) => {
  const { nombreUsuario, claveUsuario } = req.body;

  // Validación básica: campos no vacíos
  if (!nombreUsuario || !claveUsuario) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
  }

  try {
    // Consulta PARAMETRIZADA (con "?"): mysql2 escapa automáticamente
    // los valores, por lo que el usuario nunca puede inyectar SQL
    // sin importar lo que escriba en los campos.
    const [rows] = await pool.query(
      'SELECT idUsuario, nombreUsuario, privilegiosUsuario FROM usuarios WHERE nombreUsuario = ? AND claveUsuario = ?',
      [nombreUsuario, claveUsuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // Login correcto: se devuelve el usuario (sin la contraseña)
    res.json({ mensaje: 'Login exitoso', usuario: rows[0] });
  } catch (error) {
    console.error('Error al validar el login:', error);
    res.status(500).json({ mensaje: 'Error al validar el login' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});