import * as React from 'react'
import ListItem from '../core/ListItem'

interface Props {
  employees: any[]
  companies: any[]
  selectEmployee: ((employeeId: string) => void)
  selectCompany: ((companyId: string) => void)
  addEmployeeToCompany: ((companyId: string, employeeId: string) => void)
  selectedEmployeeId: string
  selectedCompanyId: string
}

interface State {
  showCompanySelect: boolean
}

class EmployeeList extends React.Component<Props, State> {
  readonly state: State = {
    showCompanySelect: false,
  }

  handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value
    this.props.selectCompany(companyId)
  }

  render() {
    const { selectedCompanyId, selectedEmployeeId } = this.props
    const CompanySelectButton = (props: any) => (
      <button className="btn btn-primary btn-sm" onClick={props.onClick}>
        Assign to Company
      </button>
    )
    const CompanySelect = () => (
      <div className="row justify-content-end align-items-center">
        <select
          value={selectedCompanyId || ''}
          onChange={this.handleSelectChange}
          className="form-control"
          style={{ width: 'auto', display: 'inline-block' }}
        >
          <option value="">No association</option>
          <option value="">----------------</option>
          {this.props.companies.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-success btn-sm ml-2"
          onClick={() => this.props.addEmployeeToCompany(selectedCompanyId, selectedEmployeeId)}
        >
          OK
        </button>
        <button
          className="btn btn-danger btn-sm ml-2"
          onClick={() => this.props.selectEmployee('')}
        >
          CANCEL
        </button>
      </div>
    )

    return (
      <div>
        {this.props.employees.map(e => (
          <ListItem
            key={e._id}
            text={e.name}
            action={
              this.props.selectedEmployeeId === e._id ? (
                <CompanySelect />
              ) : (
                <CompanySelectButton onClick={() => this.props.selectEmployee(e._id)} />
              )
            }
          />
        ))}
      </div>
    )
  }
}

export default EmployeeList
