import Employee from '../models/Employee'
import { companyService } from '../services'

export default class EmployeeService {
  Employee: typeof Employee

  constructor(employee) {
    this.Employee = employee
  }

  getAllAvailable = async () => {
    const companies = await companyService.getAll()
    let employeeIdsConnectedToCompany = []

    if (companies) {
      companies.forEach((company: any) => {
        employeeIdsConnectedToCompany = employeeIdsConnectedToCompany.concat(
          company.employees.map(e => e._id)
        )
      })
    }

    return await this.Employee.find({ _id: { $nin: employeeIdsConnectedToCompany } })
  }

  create = async (values: any) => {
    console.log(values)
    return await this.Employee.create(values)
  }
}
