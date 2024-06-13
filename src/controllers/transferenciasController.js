const pool = require('../config/db');

async function getTransferencias(req, res) {
    try {
        const result = await pool.query('SELECT * FROM transferencias');
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener transferencias:", error);
        res.status(500).json({ error: 'Error al recuperar las transferencias' });
    }
}

async function addTransferencia(req, res) {
    try {
        const { emisor, receptor, monto } = req.body;

        // Verificar saldo del emisor
        const emisorResult = await pool.query('SELECT balance FROM usuarios WHERE id = $1', [emisor]);
        if (emisorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Emisor no encontrado' });
        }

        const emisorBalance = emisorResult.rows[0].balance;
        if (emisorBalance < monto) {
            return res.status(400).json({ error: 'Saldo insuficiente' });
        }

        // Realizar la transferencia
        await pool.query('BEGIN');
        await pool.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisor]);
        await pool.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptor]);
        const result = await pool.query(
            'INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [emisor, receptor, monto]
        );
        await pool.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error("Error al añadir transferencia:", error);
        res.status(500).json({ error: 'Error al añadir la transferencia' });
    }
}

module.exports = {
    getTransferencias,
    addTransferencia,
};
