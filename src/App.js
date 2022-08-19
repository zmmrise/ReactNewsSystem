import IndexRouter from './router/IndexRouter'
import { store, persiststore } from './redux/store';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <IndexRouter />
    </PersistGate>

  </Provider>
}

export default App;
