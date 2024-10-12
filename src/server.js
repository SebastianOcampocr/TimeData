// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para hashear contraseñas
const sql = require('mssql'); // Paquete para SQL Server
const path = require('path'); // Para manejar rutas de archivos

// Crear una instancia de Express
const app = express();
const PORT = process.env.PORT || 8080; // O el puerto que prefieras
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Middleware
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a SQL Azure
const dbConfig = {
    user: 'timedata',  // Reemplaza con tu usuario de SQL Azure
    password: 'codeMMK12345',  // Reemplaza con tu contraseña
    server: 'timedataa.database.windows.net',  // Reemplaza con el servidor de SQL Azure
    database: 'TimeData',  // Reemplaza con tu base de datos
    options: {
        encrypt: true, // Importante para SQL Azure
        trustServerCertificate: false // Requiere certificado válido
    }
};

// Conectar a SQL Azure
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQL Azure.');
    }
});

// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
    const { username, email, password, accountType } = req.body;

    if (!username || !email || !password || !accountType) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const checkEmailQuery = `SELECT * FROM users WHERE email = @Email`;
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(checkEmailQuery);

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = `
            INSERT INTO users (username, email, password, accountType)
            VALUES (@Username, @Email, @Password, @AccountType)
        `;
        await pool.request()
            .input('Username', sql.VarChar, username)
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, hashedPassword)
            .input('AccountType', sql.VarChar, accountType)
            .query(insertUserQuery);

        res.status(201).json({ message: 'Usuario registrado e iniciado sesión exitosamente.', user: { username, email, accountType } });
    } catch (err) {
        console.error('Error en la ruta /register:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const sqlQuery = `SELECT * FROM users WHERE email = @Email`;
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(sqlQuery);

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { username: user.username, email: user.email, accountType: user.accountType } });
    } catch (err) {
        console.error('Error en la ruta /login:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Servir archivos estáticos de React desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para servir el archivo 'index.html' de React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});

