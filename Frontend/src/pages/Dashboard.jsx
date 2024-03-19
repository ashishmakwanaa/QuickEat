import React, { useContext, useState } from 'react'
import Navbar from '../component/Navbar'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import LoginContext from '../LoginState/Loginstate';
import Sidebar from '../component/Sidebar';



const Dashboard = ({children}) => {

  const [open, setOpen] = useState(true)
  const [dashboard,setDashboard]=useState("")
  const navigate  = useNavigate();
  const handleClick = (moduleName)=>{
    navigate(moduleName);
  }
  const StateContext = useContext(LoginContext);
  const Menus = [
    { title: "Dashboard", src: "https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Home-64.png", redirect: "/dashboard" },
    { title: "Customer List", src: "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-64.png",redirect:"/customerlist" },
    { title: "Item List", src: "https://cdn2.iconfinder.com/data/icons/flat-glyph-seo/128/_Checklist_clipboard_itemlist_items_list_shopping_list-46-64.png",redirect:"/itemlist" },
    { title: "Categories", src: "https://cdn2.iconfinder.com/data/icons/boxicons-regular-vol-1/24/bx-category-64.png",redirect:"/categories" },
    { title: "Payment History", src: "https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Wallet-64.png",redirect:"/paymentlist" },
    { title: "Invoices", src: "https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/file-invoice-64.png",redirect:"/invoicelist" }
  ]
  console.log(StateContext.login)
  return (

    <>
      <Navbar />
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} menus={Menus} onModuleClick={handleClick} />
 
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
           {children}
        </div>
      </div>

    </>

  )
}

export default Dashboard
