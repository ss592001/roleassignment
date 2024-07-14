import logo from './logo.svg';
import './App.css';
import Signup from './Components/Authentication/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store,persistor} from './Components/Redux/Reduxstore';
function App() {
  return <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
   </BrowserRouter>
   </PersistGate>
   </Provider>
  </>
}

export default App;
