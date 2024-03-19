import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/control.png'


const Sidebar = ({ open, setOpen, menus,onModuleClick }) => {

    const handlemoduleClick = (route)=>{
        onModuleClick(route)
    }
    const Location = useLocation();
  return (
    <div className={`${open ? "w-72" : "w-20"} duration-300 p-5 pt-8  h-screen bg-stone-900 relative font-[Poppins] rounded-tr-3xl rounded-br-3xl`}  >
      <img src={Logo} onClick={() => setOpen(!open)} className={`absolute cursor-pointer rounded-full -right-5 top-9 w-10 border-2 border-dark-purple ${!open && 'rotate-180'}`} />
      <div className="flex gap-x-4 items-center">
        <img
          src="https://cdn.vectorstock.com/i/1000x1000/26/10/food-fork-spoon-fruit-orange-logo-vector-24042610.webp"
          alt="QuickEat Logo"
          className={`cursor-pointer duration-500 h-6 w-6 rounded-md object-cover `}
          data-aos="fade-right"
        />
        <h1 className={`text-orange-600 origin-left font-bold text-xl duration-300 ${!open && 'scale-0'}`} >QUICKEAT</h1>
      </div>
      <ul className='pt-6'>
        {menus.map((menu, index) => (
          <li key={index} className={`text-gray-300 ${Location.pathname === menu.redirect && 'bg-orange-500 text-black'} text-lg flex items-center gap-x-4 mt-7 cursor-pointer p-2 hover:bg-orange-500 transition duration-300 hover:text-black transform  rounded-md`} >
            <img src={menu.src} alt={menu.title} className="h-8 w-8 rounded-md object-cover filter brightness-0 invert" />
            <span  onClick={()=>handlemoduleClick(menu.redirect)} className={`text-xl ${!open && 'hidden'} ${Location.pathname === menu.redirect && ' text-black'} origin-left duration-200 ${!open && 'scale-0'}`}>{menu.title}</span>
          </li>                     
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
