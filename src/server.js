// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para hashear contraseñas
const sql = require('mssql'); // Paquete para SQL Server

// Crear una instancia de Express
const app = express();
const port = process.env.PORT || 5000; // Usa el puerto de la variable de entorno o 5000 como predeterminado

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

    // Validar que los campos no estén vacíos
    if (!username || !email || !password || !accountType) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el email ya está en uso
        const checkEmailQuery = `SELECT * FROM users WHERE email = @Email`;
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(checkEmailQuery);

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'El email ya está en uso.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario
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

        // Iniciar sesión automáticamente
        res.status(201).json({ message: 'Usuario registrado e iniciado sesión exitosamente.', user: { username, email, accountType } });
    } catch (err) {
        console.error('Error en la ruta /register:', err.message); // Añadir log aquí
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

        // Compara la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Si todo es correcto, responde con un mensaje de éxito y el nombre de usuario
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { username: user.username, email: user.email, accountType: user.accountType } });
    } catch (err) {
        console.error('Error en la ruta /login:', err.message); // Añadir log aquí
        res.status(500).json({ error: err.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
