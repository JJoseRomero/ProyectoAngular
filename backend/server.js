const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// GET /api/datos -> devuelve todos los registros de la tabla "datos"
app.get('/api/datos', async (req, res) => {
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

  if (!nombreUsuario || !claveUsuario) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT idUsuario, nombreUsuario, privilegiosUsuario FROM usuarios WHERE nombreUsuario = ? AND claveUsuario = ?',
      [nombreUsuario, claveUsuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    res.json({ mensaje: 'Login exitoso', usuario: rows[0] });
  } catch (error) {
    console.error('Error al validar el login:', error);
    res.status(500).json({ mensaje: 'Error al validar el login' });
  }
});

// POST /api/usuarios -> crea un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombreUsuario, claveUsuario, privilegiosUsuario } = req.body;

  if (!nombreUsuario || !claveUsuario) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
  }

  try {
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nombreUsuario, claveUsuario, privilegiosUsuario) VALUES (?, ?, ?)',
      [nombreUsuario, claveUsuario, privilegiosUsuario]
    );

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      idUsuario: resultado.insertId
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'Ese nombre de usuario ya existe' });
    }

    res.status(500).json({ mensaje: 'Error al crear el usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});