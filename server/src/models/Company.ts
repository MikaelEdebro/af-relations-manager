import mongoose from 'mongoose'
const Schema = mongoose.Schema

export type CompanySchema = {
  name: string
  employees: [string]
}

const companySchema = new Schema({
  name: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'employee' }],
})

export default mongoose.model('company', companySchema)
