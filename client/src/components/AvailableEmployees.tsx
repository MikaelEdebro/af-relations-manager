import * as React from 'react'
import EmployeeList from './EmployeeList'

const initialState = {
  employees: [],
}
type State = Readonly<typeof initialState>

class AvailableEmployees extends React.Component<object, State> {
  readonly state: State = initialState

  public async componentDidMount() {
    const res = await fetch('/api/employees')
    const employees = await res.json()
    console.log(employees)
    this.setState(() => ({ employees }))
  }
  public render() {
    return (
      <div>
        <h1>Available Employees</h1>
        <EmployeeList employees={this.state.employees} />
      </div>
    )
  }
}

export default AvailableEmployees
