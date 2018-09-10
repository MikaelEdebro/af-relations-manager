import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import AddEmployee from './components/AddEmployee'
import CompanyList from './components/CompanyList'
import AvailableEmployees from './components/AvailableEmployees'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/employees/add" component={AddEmployee} />
            <Route path="/employees/available" component={AvailableEmployees} />
            <Route path="/companies" component={CompanyList} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
