const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const servicesRouter = require('./routes/services')
const bookingsRouter = require('./routes/bookings')
const feedbackRouter = require('./routes/feedback')
const issuesRouter = require('./routes/issues')
const { init } = require('./db')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/services', servicesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/issues', issuesRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT || 8080
init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend API listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  })
