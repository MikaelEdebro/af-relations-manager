import * as React from 'react'
import { Link } from 'react-router-dom'

const Header: React.SFC<any> = props => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            ÅF Relations Manager
          </Link>

          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/employees/add">Add Employee</Link>
            </li>
            <li>
              <Link to="/companies">List Companies</Link>
            </li>
            <li>
              <Link to="/employees/available">Available Employees</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
