import mongoose, { Document } from 'mongoose'

export type EmployeeSchema = {
  name: string
}

export type EmployeeDocument = EmployeeSchema & Document

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

export default mongoose.model<EmployeeDocument>('employee', employeeSchema)
