const express = require('express')
const router = express.Router()
const { pool } = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM issues ORDER BY createdAt DESC')
    res.json(rows)
  } catch (error) {
    console.error('Failed to list issues:', error)
    res.status(500).json({ message: 'Could not load issues.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, category, description, location, priority = 'medium', status = 'Pending' } = req.body

    if (!title || !category || !description || !location) {
      return res.status(400).json({ message: 'Missing required issue fields.' })
    }

    const [result] = await pool.query(
      'INSERT INTO issues (title, category, description, location, priority, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, category, description, location, priority, status]
    )

    const [rows] = await pool.query('SELECT * FROM issues WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    console.error('Failed to create issue:', error)
    res.status(500).json({ message: 'Could not create issue.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { status, response } = req.body
    const fields = []
    const values = []

    if (status) {
      fields.push('status = ?')
      values.push(status)
    }
    if (response) {
      fields.push('response = ?')
      values.push(response)
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No fields provided to update.' })
    }

    values.push(req.params.id)
    await pool.query(`UPDATE issues SET ${fields.join(', ')} WHERE id = ?`, values)

    const [rows] = await pool.query('SELECT * FROM issues WHERE id = ?', [req.params.id])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found.' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error('Failed to update issue:', error)
    res.status(500).json({ message: 'Could not update issue.' })
  }
})

module.exports = router
