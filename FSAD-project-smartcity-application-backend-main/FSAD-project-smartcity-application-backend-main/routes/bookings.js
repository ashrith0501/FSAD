const express = require('express')
const router = express.Router()
const { pool } = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY createdAt DESC')
    res.json(rows)
  } catch (error) {
    console.error('Failed to list bookings:', error)
    res.status(500).json({ message: 'Could not load bookings.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      name,
      email,
      date,
      time,
      notes = '',
      bookedAt,
      status = 'Confirmed',
    } = req.body

    if (!serviceId || !serviceName || !name || !email || !date || !time) {
      return res.status(400).json({ message: 'Missing required booking fields.' })
    }

    const [result] = await pool.query(
      'INSERT INTO bookings (serviceId, serviceName, name, email, date, time, notes, bookedAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [serviceId, serviceName, name, email, date, time, notes, bookedAt || new Date(), status]
    )

    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    console.error('Failed to create booking:', error)
    res.status(500).json({ message: 'Could not create booking.' })
  }
})

module.exports = router
