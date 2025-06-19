import Registration from "../models/Registration.js"
import { sendConfirmationEmail } from "../mail/confirmationMail.js"

export const createRegistration = async (req, res) => {
  try {
    const newEntry = new Registration(req.body)
    const savedEntry = await newEntry.save()

    const emailStatus = await sendConfirmationEmail(savedEntry._id.toString(), savedEntry.email)

    if (!emailStatus.success) {
      console.error("Email error:", emailStatus.error)
    }

    res.status(201).json({ message: "Registration successful", data: savedEntry })
  } catch (error) {
    res.status(500).json({ error: "Registration failed", details: error.message })
  }
}
