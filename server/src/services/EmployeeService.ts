import Employee, { EmployeeDocument } from '../models/Employee'
import { companyService } from '../services'

export default class EmployeeService {
  Employee: typeof Employee

  constructor(employee) {
    this.Employee = employee
  }

  getAllAvailable = async (): Promise<EmployeeDocument[] | null> => {
    const companies = await companyService.getAll()
    let employeeIdsConnectedToCompany = []

    // make sure to strip out employees currently connected to a company
    if (companies) {
      companies.forEach((company: any) => {
        employeeIdsConnectedToCompany = employeeIdsConnectedToCompany.concat(
          company.employees.map(e => e._id)
        )
      })
    }

    return await this.Employee.find({ _id: { $nin: employeeIdsConnectedToCompany } })
  }

  create = async (values: any): Promise<EmployeeDocument | null> => {
    return await this.Employee.create(values)
  }
}
