import * as React from 'react'

interface Props {
  toggleModal: any
}

const ModalClose: React.SFC<Props> = props => {
  return (
    <button className="close" aria-label="Close" onClick={() => props.toggleModal(false)}>
      <span aria-hidden="true">&times;</span>
    </button>
  )
}

export default ModalClose
