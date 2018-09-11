import * as React from 'react'
import { Link } from 'react-router-dom'

const Header: React.SFC<any> = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        ÅF Relations Manager
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/companies">
              Companies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
