const express = require('express')
const router = express.Router()
const { pool } = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM feedback ORDER BY createdAt DESC')
    res.json(rows)
  } catch (error) {
    console.error('Failed to list feedback:', error)
    res.status(500).json({ message: 'Could not load feedback.' })
  }
})

router.get('/stats', async (req, res) => {
  try {
    const [[countRow]] = await pool.query('SELECT COUNT(*) AS count FROM feedback')
    const [[avgRow]] = await pool.query('SELECT AVG(rating) AS averageRating FROM feedback')
    res.json({
      count: countRow.count,
      averageRating: avgRow.averageRating || 0,
    })
  } catch (error) {
    console.error('Failed to load feedback stats:', error)
    res.status(500).json({ message: 'Could not load feedback stats.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email, category, rating = 5, message } = req.body

    if (!name || !email || !category || !message) {
      return res.status(400).json({ message: 'Missing required feedback fields.' })
    }

    const [result] = await pool.query(
      'INSERT INTO feedback (name, email, category, rating, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, category, rating, message]
    )

    const [rows] = await pool.query('SELECT * FROM feedback WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    console.error('Failed to submit feedback:', error)
    res.status(500).json({ message: 'Could not submit feedback.' })
  }
})

module.exports = router
