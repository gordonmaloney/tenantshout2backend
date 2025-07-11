// backend/routes/verify.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// GET /verify
router.get('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    res.status(200).json({ success: true, user });
  });
});

module.exports = router;
