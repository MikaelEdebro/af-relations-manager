import mongoose from 'mongoose'

export type CompanySchema = {
  name: string
  employees: [string]
}

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  employees: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
})

export default mongoose.model('company', companySchema)
