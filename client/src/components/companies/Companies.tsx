import * as React from 'react'
import CompanyList from './CompanyList'
import AddCompany from './AddCompany'
import * as ReactModal from 'react-modal'
import { getFetchHeaders } from '../../utility/helpers'
import ModalClose from '../core/ModalClose'

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
    await fetch('/api/companies', getFetchHeaders('POST', { name: this.state.newCompanyName }))

    this.toggleAddCompanyModal(false)
    await this.fetchCompanies()
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newCompanyName: event.target.value })
  }

  toggleAddCompanyModal = (value: boolean) => {
    this.setState({ showAddCompanyModal: value, newCompanyName: '' })
  }

  removeEmployeeFromCompany = async (companyId: string, employeeId: string) => {
    await fetch(
      `/api/companies/${companyId}/${employeeId}`,
      getFetchHeaders('DELETE', { companyId, employeeId })
    )
    await this.fetchCompanies()
  }

  render() {
    return (
      <div>
        <div className="row align-items-center">
          <div className="col">
            <h1>Companies</h1>
          </div>
          <div className="col text-right">
            <button className="btn btn-primary" onClick={() => this.toggleAddCompanyModal(true)}>
              Add Company
            </button>
          </div>
        </div>

        <CompanyList
          companies={this.state.companies}
          removeEmployeeFromCompany={this.removeEmployeeFromCompany}
        />

        <ReactModal
          isOpen={this.state.showAddCompanyModal}
          onRequestClose={() => this.toggleAddCompanyModal(false)}
          ariaHideApp={false}
        >
          <ModalClose toggleModal={() => this.toggleAddCompanyModal(false)} />
          <AddCompany
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            toggle={this.toggleAddCompanyModal}
            newCompanyName={this.state.newCompanyName}
          />
        </ReactModal>
      </div>
    )
  }
}

export default Companies
