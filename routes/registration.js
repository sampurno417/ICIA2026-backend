import express from 'express'
import Registration from '../models/Registration.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newEntry = new Registration(req.body)
    const savedEntry = await newEntry.save()
    res.status(201).json(savedEntry)
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

export default router
