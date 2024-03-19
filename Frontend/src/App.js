import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPsw from './component/ForgotPsw';
import LoginContext from '../src/LoginState/Loginstate';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import AddItem from './pages/AddItem';
import DashboardPage from './Admin/DashboardPage';
import CustomerList from './Admin/CustomerList';
import ItemList from './Admin/ItemList';
import Categories from './Admin/Categories';
import PaymentList from './Admin/PaymentList';
import Invoicelist from './Admin/Invoicelist';
import Orders from './Admin/Orders';


function App() {

  const [login, setLogin] = useState(false);
  const [restaurantname, setrestrurantname] = useState("");
  const [ownername, setownername] = useState("");

  console.log(login)
  return (
    <LoginContext.Provider value={{ login, setLogin, restaurantname, setrestrurantname, ownername, setownername }}>
      <Router>
        <Routes>
          {
            login ? (
              <>

                <Route path="/" element={<Dashboard />} />
               
              </>
            )

              :
              <Route path="/" element={<Homepage />} />
          }

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/forgotpassword/:id/:token' element={<ForgotPsw />} />
          <Route path='/addcustomer' element={<AddCustomer />} />
          <Route path='/additem' element={<AddItem />} />
          <Route path='/dashboard' element={<Dashboard><DashboardPage/></Dashboard>} />
          <Route path='/customerlist' element={<Dashboard><CustomerList/></Dashboard>} />
          <Route path='/itemlist' element={<Dashboard><ItemList/></Dashboard>} />
          <Route path='/categories' element={<Dashboard><Categories/></Dashboard>} />
          <Route path='/paymentlist' element={<Dashboard><PaymentList/></Dashboard>} />
          <Route path='/invoicelist' element={<Dashboard><Invoicelist/></Dashboard>} />
          <Route path='/order/:id' element={<Dashboard><Orders/></Dashboard>} />
        </Routes>
      </Router>
    </LoginContext.Provider>

  );
}

export default App;

