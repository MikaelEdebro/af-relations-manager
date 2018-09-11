import mongoose, { Document } from 'mongoose'
import { EmployeeDocument } from './Employee'
const Schema = mongoose.Schema

export interface CompanySchema {
  name: string
  employees: any[]
}

export type CompanyDocument = CompanySchema & Document

const companySchema = new Schema({
  name: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'employee' }],
})

export default mongoose.model<CompanyDocument>('company', companySchema)
