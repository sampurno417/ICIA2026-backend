import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({
  name: String,
  affiliation: String,
  paperId: String,
  paperTitle: String,
  email: String,
  phone: Number,
  paymentId: String,
  amountPaid: Number,
  type: String, // student, scholar, industry, etc.
}, { timestamps: true })

export default mongoose.model('Registration', registrationSchema)
