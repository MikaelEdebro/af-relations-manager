import { Employee, Company } from '../models'
import EmployeeService from './EmployeeService'
import CompanyService from './CompanyService'

const employeeService = new EmployeeService(Employee)
const companyService = new CompanyService(Company)

export { employeeService, companyService }
