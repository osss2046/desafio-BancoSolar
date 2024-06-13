const express = require('express');
const path = require('path');

const usuarioRoutes = require('./src/routes/usuarios');
const transferenciaRoutes = require('./src/routes/transferencias');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRoutes);
app.use('/transferencias', transferenciaRoutes);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
