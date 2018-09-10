import Company from '../models/Company'

export default class CompanyService {
  Company: typeof Company

  constructor(company) {
    this.Company = company
  }

  getAll = async () => {
    return await this.Company.find({})
  }

  create = async (values: any) => {
    return await this.Company.create(values)
  }
}
