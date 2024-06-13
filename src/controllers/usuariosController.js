const pool = require('../config/db');

async function getUsuarios(req, res) {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: 'Error al recuperar los usuarios' });
    }
}

async function addUsuario(req, res) {
    try {
        const { nombre, balance } = req.body;
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *',
            [nombre, balance]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al añadir usuario:", error);
        res.status(500).json({ error: 'Error al añadir el usuario' });
    }
}

async function updateUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nombre, balance } = req.body;
        const result = await pool.query(
            'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *',
            [nombre, balance, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

async function deleteUsuario(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado o ya eliminado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario
};
