import Company from '../models/Company'

export default class CompanyService {
  Company: typeof Company

  constructor(company) {
    this.Company = company
  }

  getAll = async () => {
    return await this.Company.find({}).populate('employees')
  }

  create = async (values: any) => {
    return await this.Company.create(values)
  }

  edit = async (companyId: string, values: any) => {
    return await this.Company.findOneAndUpdate(companyId, values, { new: true }).populate(
      'employees'
    )
  }
}
