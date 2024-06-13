// src/models/usuario.js

const pool = require('../config/db');

async function addUsuario(nombre, balance) {
    const res = await pool.query('INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *', [nombre, balance]);
    return res.rows[0];
}

async function getUsuarios() {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
}

async function updateUsuario(id, nombre, balance) {
    const res = await pool.query('UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *', [id, nombre, balance]);
    return res.rows[0];
}

async function deleteUsuario(id) {
    const res = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return res.rowCount;
}

module.exports = {
    addUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario
};
