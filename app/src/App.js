import './App.css';

import Home from './pages/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './pages/Signup.jsx';
import { CartDetails } from './components/ContextReducer.js';
import MyOrder from './pages/MyOrder.jsx';

function App() {
  return (
    <>
    <CartDetails>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createuser" element={<Signup/>} />
        <Route exact path="/myOrder" element={<MyOrder />} />
      </Routes>
    </Router>
    </CartDetails>
    </>
  );
}

export default App;
