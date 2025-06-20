import express from "express"
import { createRegistration } from "../controllers/registrationController.js"

const router = express.Router()
router.post("/", createRegistration)

router.get("/", (req, res) => {
  res.send("Welcome to the MongoDB API! Use POST / to register.");
})


export default router
