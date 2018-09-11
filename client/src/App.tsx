import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Employees from './components/employees/Employees'
import Companies from './components/companies/Companies'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="container">
          <Header />

          <Switch>
            <Route path="/companies" component={Companies} />
            <Route path="/employees" component={Employees} />
            <Route render={() => <Redirect to="/companies" />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
