import * as React from 'react'
import * as ReactModal from 'react-modal'
import ListItem from '../core/ListItem'
import ModalClose from '../core/ModalClose'
import { getTextProperty, getArrayProperty } from '../../utility/helpers'

interface Props {
  companies: any[]
  removeEmployeeFromCompany: ((companyId: string, employeeId: string) => any)
}

interface State {
  selectedCompany: any
  showModal: boolean
}

class CompanyList extends React.Component<Props, State> {
  readonly state: State = {
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

    // remove employee from selectedCompany (to update GUI)
    const companyEmployees = [...this.state.selectedCompany.employees]
    const removeEmployeeIndex = companyEmployees.findIndex(e => e._id === employeeId)

    if (removeEmployeeIndex > -1) {
      companyEmployees.splice(removeEmployeeIndex, 1)
      this.setState({
        selectedCompany: { ...this.state.selectedCompany, employees: companyEmployees },
      })
    }
  }

  toggleModal = (value: boolean) => {
    this.setState({ showModal: value })
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
          onRequestClose={() => this.toggleModal(false)}
        >
          <ModalClose toggleModal={() => this.toggleModal(false)} />

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
                  Remove from company
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

export default CompanyList
