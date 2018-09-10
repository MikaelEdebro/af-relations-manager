import Employee from '../models/Employee'

export default class EmployeeService {
  Employee: typeof Employee

  constructor(employee) {
    this.Employee = employee
  }

  getAll = async () => {
    return await this.Employee.find({})
  }

  create = async (values: any) => {
    return await this.Employee.create(values)
  }
}
