import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Provider} from 'react-redux';
import store from './redux/store'
import Router from './components/Router';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Provider store={store}>
      <Router />
    </Provider>
    </div>
  )
}

export default App
