import Company, { CompanySchema, CompanyDocument } from '../models/Company'

export default class CompanyService {
  Company: typeof Company

  constructor(company) {
    this.Company = company
  }

  getAll = async (): Promise<CompanyDocument[] | null> => {
    return await this.Company.find({}).populate('employees')
  }

  getById = async (companyId: string): Promise<CompanyDocument | null> => {
    return await this.Company.findById(companyId).populate('employees')
  }

  create = async (values: any): Promise<CompanyDocument | null> => {
    return await this.Company.create(values)
  }

  edit = async (companyId: string, values: any): Promise<CompanyDocument | null> => {
    return await this.Company.findOneAndUpdate({ _id: companyId }, values, { new: true }).populate(
      'employees'
    )
  }

  addEmployee = async (companyId: string, employeeId: string): Promise<CompanyDocument | null> => {
    const company = await this.getById(companyId)
    if (!company) return Promise.resolve(null)
    const employeeIndex = company.employees.findIndex(e => e._id.toString() === employeeId)
    if (employeeIndex > 0) return Promise.resolve(null)
    const employees = [...company.employees]
    employees.push(employeeId)
    return await this.edit(companyId, { employees })
  }

  removeEmployee = async (
    companyId: string,
    employeeId: string
  ): Promise<CompanyDocument | null> => {
    const company = await this.getById(companyId)
    if (!company) return Promise.resolve(null)

    const employeeIndex = company.employees.findIndex(e => e._id.toString() === employeeId)
    if (employeeIndex < 0) return Promise.resolve(null)
    let employees = [...company.employees]
    employees.splice(employeeIndex, 1)
    return await this.edit(companyId, { employees })
  }
}
