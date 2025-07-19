const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth'); // Remove auth middleware
const Student = require('../models/Student');

// Get all students (public)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 