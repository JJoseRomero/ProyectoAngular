const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Detecta el sistema operativo a partir del "User-Agent" que envía
// el navegador en cada petición. No requiere que el usuario escriba nada.
function detectarSistemaOperativo(userAgent) {
  if (!userAgent) return 'Desconocido';
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os') || ua.includes('macintosh')) return 'OSX';
  if (ua.includes('linux') && !ua.includes('android')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Desconocido';
}

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

// GET /api/bitacora -> devuelve todos los registros de "bitacora"
// combinados con el nombre del usuario (JOIN con "usuarios").
app.get('/api/bitacora', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT b.idBitacora, b.fechaHoraBitacora, b.SoBitacora, b.idUsuarioBitacora,
              u.nombreUsuario
       FROM bitacora b
       JOIN usuarios u ON b.idUsuarioBitacora = u.idUsuario
       ORDER BY b.fechaHoraBitacora DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar la bitacora:', error);
    res.status(500).json({ mensaje: 'Error al obtener la bitacora' });
  }
});

// POST /api/login -> valida usuario y contraseña, y si es correcto
// registra el acceso en la tabla "bitacora".
app.post('/api/login', async (req, res) => {
  const { nombreUsuario, claveUsuario } = req.body;

  if (!nombreUsuario || !claveUsuario) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
  }

  try {
    // Consulta parametrizada: protege contra inyección SQL
    const [rows] = await pool.query(
      'SELECT idUsuario, nombreUsuario, privilegiosUsuario FROM usuarios WHERE nombreUsuario = ? AND claveUsuario = ?',
      [nombreUsuario, claveUsuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const usuario = rows[0];
    const sistemaOperativo = detectarSistemaOperativo(req.headers['user-agent']);

    // Se guarda el acceso en la bitacora (también con consulta parametrizada)
    await pool.query(
      'INSERT INTO bitacora (fechaHoraBitacora, SoBitacora, idUsuarioBitacora) VALUES (NOW(), ?, ?)',
      [sistemaOperativo, usuario.idUsuario]
    );

    res.json({ mensaje: 'Login exitoso', usuario });
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