import * as React from 'react'

interface Props {
  toggle: ((value: boolean) => void)
  handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void)
  handleSubmit: ((event: React.FormEvent) => void)
  newCompanyName: string
}

const AddEmployee: React.SFC<Props> = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit} style={{ padding: 10, maxWidth: 500, margin: '0 auto' }}>
        <h1>Add Company</h1>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            id="name"
            className="form-control"
            placeholder="Enter name of company"
            value={props.newCompanyName}
            onChange={props.handleChange}
          />
        </div>
        <div className="form-group text-right">
          <button type="button" className="btn btn-warning" onClick={() => props.toggle(false)}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary ml-2" onClick={props.handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddEmployee
