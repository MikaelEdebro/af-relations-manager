import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import 'materialize-css/dist/css/materialize.min.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
