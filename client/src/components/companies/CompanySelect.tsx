import * as React from 'react'

interface Props {
  companies: any[]
  selectedCompanyId: string
  handleSelectChange: any
}

const CompanySelect: React.SFC<Props> = props => {
  return (
    <div>
      <label htmlFor="company">Company Association</label>
      <select
        id="company"
        className="form-control"
        value={props.selectedCompanyId}
        onChange={props.handleSelectChange}
      >
        <option value="">No association</option>
        <option value="">----------------</option>
        {props.companies.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CompanySelect
