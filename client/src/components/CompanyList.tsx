import * as React from 'react'
import * as ReactModal from 'react-modal'

interface Props {
  companies: any[]
  removeEmployeeFromCompany: ((companyId: string, employeeId: string) => any)
}

interface State {
  selectedCompany: any
  showModal: boolean
}

const listItemStyles = {
  padding: 10,
  border: '1px solid rgba(0,0,0,.2)',
  borderRadius: 4,
  margin: '20px 0',
  cursor: 'pointer',
}

class CompanyList extends React.Component<Props, State> {
  readonly state = {
    selectedCompany: undefined,
    showModal: false,
  }

  selectCompany = (company: any) => {
    this.setState({ selectedCompany: company, showModal: true })
  }

  render() {
    return (
      <div>
        {this.props.companies.map(c => (
          <div key={c._id} style={listItemStyles} onClick={() => this.selectCompany(c)}>
            {c.name}
          </div>
        ))}

        <ReactModal
          isOpen={!!(this.state.showModal && this.state.selectedCompany)}
          ariaHideApp={false}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <div>
            <h2>{getTextProperty(this.state.selectedCompany, 'name')}</h2>
            <ul>
              {getArrayProperty(this.state.selectedCompany, 'employees').map((e: any) => (
                <li key={e._id}>
                  {e.name}
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      this.props.removeEmployeeFromCompany(
                        getTextProperty(this.state.selectedCompany, '_id'),
                        e._id.toString()
                      )
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
