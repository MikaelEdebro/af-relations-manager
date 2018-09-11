import * as React from 'react'
import EmployeeList from './EmployeeList'
import * as ReactModal from 'react-modal'
import AddEmployee from './AddEmployee'
import { RouteComponentProps } from 'react-router-dom'
import { getFetchHeaders } from '../../utility/helpers'
import ModalClose from '../core/ModalClose'

interface Props extends RouteComponentProps<any> {}

interface State {
  employees: any[]
  companies: any[]
  selectedEmployeeId: string
  selectedCompanyId: string
  showAddEmployeeModal: boolean
}

class Employees extends React.Component<Props, State> {
  readonly state: State = {
    employees: [],
    companies: [],
    selectedCompanyId: '',
    selectedEmployeeId: '',
    showAddEmployeeModal: false,
  }

  async componentDidMount() {
    this.setState({ selectedCompanyId: '', selectedEmployeeId: '' })
    await this.fetchCompanies()
    await this.fetchEmployees()
  }

  fetchCompanies = async () => {
    const companiesRes = await fetch('/api/companies')
    const companies = await companiesRes.json()
    this.setState({ companies })
  }

  fetchEmployees = async () => {
    const employeesRes = await fetch('/api/employees')
    const employees = await employeesRes.json()
    this.setState({ employees })
  }

  selectCompany = (companyId: string) => {
    this.setState({ selectedCompanyId: companyId })
  }

  selectEmployee = (employeeId: string) => {
    this.setState({ selectedEmployeeId: employeeId })
  }

  addEmployee = async (request: any) => {
    await fetch('/api/employees', getFetchHeaders('POST', request))
    await this.fetchEmployees()
    this.setState({ showAddEmployeeModal: false })
  }

  addEmployeeToCompany = async (companyId: string, employeeId: string) => {
    await fetch(`/api/companies/${companyId}/${employeeId}`, getFetchHeaders('PUT'))
    await this.fetchEmployees()
  }

  toggleAddEmployeeModal = (value: boolean) => {
    this.setState({ showAddEmployeeModal: value })
  }

  render() {
    return (
      <div>
        <div className="row align-items-center">
          <div className="col">
            <h1>Employees</h1>
          </div>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={() => this.toggleAddEmployeeModal(true)}>
              Add Employee
            </button>
          </div>
        </div>

        {this.state.employees.length ? (
          <EmployeeList
            employees={this.state.employees}
            companies={this.state.companies}
            selectEmployee={this.selectEmployee}
            selectCompany={this.selectCompany}
            addEmployeeToCompany={this.addEmployeeToCompany}
            selectedCompanyId={this.state.selectedCompanyId}
            selectedEmployeeId={this.state.selectedEmployeeId}
          />
        ) : (
          'Currently no available employees'
        )}

        <ReactModal
          isOpen={this.state.showAddEmployeeModal}
          onRequestClose={() => this.toggleAddEmployeeModal(false)}
          ariaHideApp={false}
        >
          <ModalClose toggleModal={() => this.toggleAddEmployeeModal(false)} />
          <AddEmployee companies={this.state.companies} addEmployee={this.addEmployee} />
        </ReactModal>
      </div>
    )
  }
}

export default Employees
