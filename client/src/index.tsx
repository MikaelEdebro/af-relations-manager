import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import * as ReactModal from 'react-modal'

// @ts-ignore
ReactModal.defaultStyles.content.maxWidth = '800px'
// @ts-ignore
ReactModal.defaultStyles.content.margin = '0 auto'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
