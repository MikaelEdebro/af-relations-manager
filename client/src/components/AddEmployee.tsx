import * as React from 'react'

const initialState = {
  name: '',
}

type State = Readonly<typeof initialState>

class AddEmployee extends React.Component<object, State> {
  readonly state = initialState

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    await fetch('/api/employees', {
      body: JSON.stringify(this.state),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <div>
        <h1 className="center">Add Employee</h1>
        <form
          onSubmit={this.handleSubmit}
          style={{ padding: 10, maxWidth: 400, margin: '0 auto', textAlign: 'center' }}
        >
          <input placeholder="Employee Name" value={this.state.name} onChange={this.handleChange} />
          <a
            className="waves-effect waves-light btn-large"
            style={{ width: '100%', marginTop: 10 }}
            onClick={this.handleSubmit}
          >
            Submit
          </a>
        </form>
      </div>
    )
  }
}

export default AddEmployee
