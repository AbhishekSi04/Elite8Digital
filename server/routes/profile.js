const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// Get own profile
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit own profile
router.put('/', auth, async (req, res) => {
  const { name, email, password } = req.body;
  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(password, salt);
  }
  try {
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Simulate fee payment
router.post('/pay', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: { feesPaid: true } },
      { new: true }
    ).select('-password');
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 