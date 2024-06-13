const express = require('express');
const router = express.Router();
const { getTransferencias, addTransferencia } = require('../controllers/transferenciasController');

router.get('/', getTransferencias);
router.post('/', addTransferencia);

module.exports = router;
