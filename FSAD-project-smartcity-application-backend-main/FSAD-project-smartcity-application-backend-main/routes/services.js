const express = require('express')
const router = express.Router()
const { pool } = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY id')
    res.json(rows)
  } catch (error) {
    console.error('Failed to load services:', error)
    res.status(500).json({ message: 'Could not load services.' })
  }
})

module.exports = router
