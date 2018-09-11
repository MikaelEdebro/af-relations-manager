import * as React from 'react'
import * as ReactModal from 'react-modal'
import ListItem from '../core/ListItem'

interface Props {
  companies: any[]
  removeEmployeeFromCompany: ((companyId: string, employeeId: string) => any)
}

interface State {
  selectedCompany: any
  showModal: boolean
}

class CompanyList extends React.Component<Props, State> {
  readonly state = {
    selectedCompany: undefined,
    showModal: false,
  }

  selectCompany = (company: any) => {
    this.setState({ selectedCompany: company, showModal: true })
  }

  removeEmployee = (employeeId: string) => {
    this.props.removeEmployeeFromCompany(
      getTextProperty(this.state.selectedCompany, '_id'),
      employeeId
    )
  }

  render() {
    return (
      <div>
        {this.props.companies.map(c => (
          <ListItem
            key={c._id}
            text={c.name}
            action={
              <span>
                <small>{c.employees.length} employees</small>
              </span>
            }
            onClick={() => this.selectCompany(c)}
          />
        ))}

        <ReactModal
          isOpen={!!(this.state.showModal && this.state.selectedCompany)}
          ariaHideApp={false}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <h2>{getTextProperty(this.state.selectedCompany, 'name')}</h2>
          {getArrayProperty(this.state.selectedCompany, 'employees').map((e: any) => (
            <ListItem
              key={e._id}
              text={e.name}
              action={
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.removeEmployee(e._id)}
                >
                  Delete
                </button>
              }
            />
          ))}
          {getArrayProperty(this.state.selectedCompany, 'employees').length === 0 &&
            'No employees associated to this company'}
        </ReactModal>
      </div>
    )
  }
}

function getTextProperty(obj: object | undefined, propName: string): string {
  if (!obj) {
    return ''
  }

  return obj[propName] || ''
}
function getArrayProperty(obj: object | undefined, propName: string): any[] {
  if (!obj) {
    return []
  }

  return obj[propName] || []
}
export default CompanyList
