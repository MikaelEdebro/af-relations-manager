import * as React from 'react'
import CompanySelect from '../companies/CompanySelect'

interface Props {
  companies: any[]
  addEmployee: ((request: any) => void)
  toggleAddEmployeeModal: ((value: boolean) => void)
}
interface State {
  name: string
  selectedCompany: string
}

export default class AddEmployee extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    selectedCompany: '',
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    this.props.addEmployee({ name: this.state.name, companyId: this.state.selectedCompany })
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedCompany: event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
          <h1>Add Employee</h1>
          <div className="form-group">
            <label htmlFor="name">Employee Name</label>
            <input
              id="name"
              className="form-control"
              placeholder="Employee Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <CompanySelect
              companies={this.props.companies}
              selectedCompanyId={this.state.selectedCompany}
              handleSelectChange={this.handleSelectChange}
            />
          </div>
          <div className="form-group text-right">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => this.props.toggleAddEmployeeModal(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary ml-2" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
