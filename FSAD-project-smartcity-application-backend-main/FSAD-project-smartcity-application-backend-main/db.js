const mysql = require('mysql2/promise')
const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'smartcity',
} = process.env

const rootPool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

async function init() {
  await rootPool.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'active'
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      serviceId INT NOT NULL,
      serviceName VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time VARCHAR(10) NOT NULL,
      notes TEXT,
      bookedAt DATETIME NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      rating INT NOT NULL DEFAULT 5,
      message TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS issues (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      location VARCHAR(255) NOT NULL,
      priority VARCHAR(50) NOT NULL DEFAULT 'medium',
      status VARCHAR(50) NOT NULL DEFAULT 'Pending',
      response TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  const [serviceCountRows] = await pool.query('SELECT COUNT(*) AS count FROM services')
  if (serviceCountRows[0].count === 0) {
    await pool.query(
      'INSERT INTO services (name, description, category, status) VALUES ?',
      [
        [
          ['Water Supply', 'Reliable and clean water distribution across the city', 'water', 'active'],
          ['Electricity', 'Efficient power distribution and maintenance', 'electricity', 'active'],
          ['Waste Management', 'Sustainable waste collection and recycling services', 'waste', 'active'],
          ['Public Transport', 'Easy city-wide transportation with buses and metro', 'transport', 'active'],
          ['Internet Services', 'High-speed internet connectivity for residents', 'utilities', 'active'],
          ['Street Lighting', '24/7 street lighting maintenance and upgrades', 'utilities', 'active'],
        ],
      ]
    )
  }
}

module.exports = { pool, init }
