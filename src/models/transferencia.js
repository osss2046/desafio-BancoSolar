// src/models/transferencia.js

const pool = require('../config/db');

async function addTransferencia(emisorId, receptorId, monto) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisorId]);
        await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptorId]);
        const res = await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *', [emisorId, receptorId, monto]);
        await client.query('COMMIT');
        return res.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function getTransferencias() {
    const res = await pool.query('SELECT * FROM transferencias');
    return res.rows;
}

module.exports = {
    addTransferencia,
    getTransferencias
};
