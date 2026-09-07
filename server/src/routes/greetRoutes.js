const express = require('express');
const router = express.Router();
const { getHealth, postGreet } = require('../controllers/greetController');

// GET /api/health
router.get('/health', getHealth);

// POST /api/greet
router.post('/greet', postGreet);

module.exports = router;
