import * as React from 'react'
// import { IEmployee } from '../models/Employee'

interface Props {
  employees: any[]
}

const EmployeeList: React.SFC<Props> = ({ employees }) => {
  return (
    <div>
      {employees.map(e => (
        <p key={e._id}>{e.name}</p>
      ))}
    </div>
  )
}

export default EmployeeList
