import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<any> {}
interface State {
  name: string
  selectedCompany: string
  companies: any[]
}

export default class AddEmployee extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    companies: [],
    selectedCompany: '',
  }

  async componentDidMount() {
    const res = await fetch('/api/companies')
    const companies = await res.json()
    this.setState({ companies })
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const req = { name: this.state.name, companyId: this.state.selectedCompany }

    await fetch('/api/employees', {
      body: JSON.stringify(req),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    this.props.history.push('/employees/available')
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
            <label htmlFor="company">Company Association</label>
            <select
              id="company"
              className="form-control"
              value={this.state.selectedCompany}
              onChange={this.handleSelectChange}
            >
              <option value="">No association</option>
              <option value="">----------------</option>
              {this.state.companies.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group text-right">
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
