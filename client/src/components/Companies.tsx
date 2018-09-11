import * as React from 'react'
import CompanyList from './CompanyList'
import AddCompany from './AddCompany'
import * as ReactModal from 'react-modal'

interface State {
  companies: any[]
  showAddCompanyModal: boolean
  newCompanyName: string
}

class Companies extends React.Component<object, State> {
  readonly state = {
    companies: [],
    showAddCompanyModal: false,
    newCompanyName: '',
  }

  async componentDidMount() {
    await this.fetchCompanies()
  }

  async fetchCompanies() {
    const res = await fetch('/api/companies')
    const companies = await res.json()
    this.setState({ companies })
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const req = { name: this.state.newCompanyName }

    await fetch('/api/companies', {
      body: JSON.stringify(req),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    this.toggleAddCompany(false)
    await this.fetchCompanies()
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newCompanyName: event.target.value })
  }

  toggleAddCompany = (value: boolean) => {
    this.setState({ showAddCompanyModal: value, newCompanyName: '' })
  }

  removeEmployeeFromCompany = async (companyId: string, employeeId: string) => {
    const req = { companyId, employeeId }

    await fetch(`/api/companies/${companyId}/${employeeId}`, {
      body: JSON.stringify(req),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  }

  render() {
    return (
      <div>
        <h1>Companies</h1>
        <ReactModal
          isOpen={this.state.showAddCompanyModal}
          onRequestClose={() => this.toggleAddCompany(false)}
          ariaHideApp={false}
        >
          <AddCompany
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            toggle={this.toggleAddCompany}
            newCompanyName={this.state.newCompanyName}
          />
        </ReactModal>
        <button className="btn btn-primary" onClick={() => this.toggleAddCompany(true)}>
          Add Company
        </button>

        <CompanyList
          companies={this.state.companies}
          removeEmployeeFromCompany={this.removeEmployeeFromCompany}
        />
      </div>
    )
  }
}

export default Companies
