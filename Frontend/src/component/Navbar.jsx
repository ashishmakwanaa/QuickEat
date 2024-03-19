import React, { useContext, useState } from 'react';
import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { IoIosLogOut } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdMiscellaneousServices, MdContactPage } from 'react-icons/md';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AOS from 'aos';
import Swal from "sweetalert2"
import 'aos/dist/aos.css';
import { Link, resolvePath, useNavigate } from "react-router-dom"
import LoginContext from '../LoginState/Loginstate';


AOS.init({
    offset: 200,
    duration: 1300,
    easing: 'ease-in-out',
    once: true,
});


const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        console.log(element)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [PasswordData, setPasswordData] = useState({
        oldpassword: "",
        newpassword: "",
        newchangepassword: "",
    })

    const [dropdown, setDropDown] = useState(false);
    const [open, setOpen] = useState(false)

    const handleDropDown = () => {
        setDropDown(!dropdown);
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    }
    const handleChangePassword = async (e) => {
        if(PasswordData.oldpassword === '' || PasswordData.newpassword || PasswordData.newchangepassword){
            Swal.fire({title:"Please Fill All Fields",icon:"warning",timer:1000})
        }
        if(PasswordData.newchangepassword !== PasswordData.newpassword){
            Swal.fire({title:"Password Does Not Match",icon:"error",timer:1000})
        }
        setOpen(false)
        try {
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/update/updatepassword/${StateContext.restaurantname}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(PasswordData)
            })
            const data = response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Password Change Succssfully", icon: "success", timer: 1000
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Something Went Wrong",
                icon: "error",
                timer: 1000
            })
        }
    }

    const StateContext = useContext(LoginContext);
    return (
        <nav className="bg-transparent p-4  flex items-center justify-between font-[Poppins] shadow-2xl rounded-full">
            {/* Left side */}
            {!StateContext.login ? (<div className="flex items-center" data-aos="fade-right">
                <span className="text-black  font-bold text-3xl">
                    Quick<span className="text-orange-500 shadow-orange text-3xl">Eat</span>
                </span><span> <img
                    src="https://cdn.vectorstock.com/i/1000x1000/26/10/food-fork-spoon-fruit-orange-logo-vector-24042610.webp"
                    alt="QuickEat Logo"
                    className="h-6 w-12 rounded-full object-cover"
                /></span>
            </div>) : (<div className="flex items-center" data-aos="fade-right">
                <span className="text-black  font-bold text-3xl">
                    Welcome ,<span className="text-orange-500 shadow-orange text-3xl">{StateContext.restaurantname}</span>
                </span>
            </div>)}

            {/* Center links */}
            {!StateContext.login && <div className="flex items-center space-x-4 gap-5" data-aos="fade-right">
                <a href="#/" className="text-black text-xl relative group flex items-center">
                    <span className='font-normal hover:text-orange-300 transform duration-300'>Home</span>
                    <AiFillHome className="ml-2 text-orange-500" />
                    <span className="absolute inset-x-0 bottom-0 h-1 top-8 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>

                <a href="#about-us" className="text-black text-xl relative group flex items-center" onClick={() => scrollToSection("about-us")}>
                    <span className='font-normal hover:text-orange-300 transform duration-300'>About Us</span>
                    <AiFillInfoCircle className="ml-2 text-orange-500" />
                    <span className="absolute inset-x-0 bottom-0 h-1 top-8 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>

                <a href="#services" className="text-black text-xl relative group flex items-center" >
                    <span className='font-normal hover:text-orange-300 transform duration-300'>Services</span>
                    <MdMiscellaneousServices className="ml-2 text-orange-500" />
                    <span className="absolute inset-x-0 bottom-0 h-1 top-8 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>

                <a href="#contact" className="text-black text-xl relative group flex items-center">
                    <span className='font-normal hover:text-orange-300 transform duration-300'>Contact Us</span>
                    <MdContactPage className="ml-2 text-orange-500" />
                    <span className="absolute inset-x-0 bottom-0 h-1 top-8 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
            </div>}

            {/* Right side */}
            {!StateContext.login ? (<div className="flex items-center space-x-4" data-aos="fade-right">
                <Link to="/login">
                    <button className="bg-orange-500 border-2 border-orange-500 w-24  text-white py-2 px-4 rounded-xl hover:bg-transparent hover:text-orange-500 hover:border-orange-500 transition duration-500">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="bg-orange-500 border-2 border-orange-500 text-white py-2 px-4 rounded-xl hover:bg-transparent hover:text-orange-500 hover:border-orange-500 transition duration-500">
                        Sign Up
                    </button>
                </Link>

            </div>) : (<div className="flex flex-row items-center space-x-4 ml-[-70px]" data-aos="fade-right">
                <Link to="/addcustomer">
                    <button className="bg-orange-500 border-2 border-orange-500 w-44  text-white py-2 px-4 rounded-xl hover:bg-transparent hover:text-orange-500 hover:border-orange-500 transition duration-500">
                        Add Customer +
                    </button>
                </Link>
                <Link to="/additem">
                    <button className="bg-orange-500 border-2 border-orange-500 text-white py-2 px-4 rounded-xl hover:bg-transparent hover:text-orange-500 hover:border-orange-500 transition duration-500">
                        Add Food +
                    </button>
                </Link>
                <div className='w-12 h-12 rounded-full ml-[36] bg-black text-white'><p onClick={handleDropDown} className=' text-center text-2xl font-[Poppins] mt-2 cursor-pointer'>{StateContext.ownername}</p></div>
                {dropdown && <div className='absolute top-full bg-white border border-gray-300 rounded-md shadow-lg mt-4 z-10 left-[220px] transform -translate-x-1/2'>
                    <div className='w-72 h-full flex flex-col p-1 '>
                        <div className=' w-full h-12 '><img className='w-full h-16 rounded-t-md ' src="https://s3-alpha.figma.com/hub/file/3985988130/c4546d67-7453-4705-8641-64be00123f64-cover.png" alt="" /></div>
                        <div className='w-16 h-16 rounded-full ml-[36] mt-[-14px] bg-black m-auto text-white'><p onClick={handleDropDown} className=' text-center text-2xl font-[Poppins] mt-4 cursor-pointer'>{StateContext.ownername}</p></div>

                        <ul className="p-2">
                            <li onClick={handleClickOpen} className='px-4 py-2 flex items-center hover:rounded-md hover:ml-2 transform duration-300 cursor-pointer text-md hover:bg-black hover:text-white'>
                                <RiLockPasswordFill className="ml-1 mr-1" /> Change Password
                            </li>
                        </ul>

                        <hr className='border' />
                        <ul className="p-2">
                            <li onClick={handleLogout} className='px-4 py-2 flex items-center hover:rounded-md hover:ml-2 transform duration-300 cursor-pointer text-md hover:bg-black hover:text-white'>
                                <IoIosLogOut className="ml-1 mr-1" /> Logout
                            </li>
                        </ul>

                    </div>
                </div>}
            </div>)}
            <Dialog
            maxWidth="xl"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle style={{ textAlign: "center", fontFamily: "Poppins", fontSize: "20px", color: "orange", fontWeight: "bold", color: "white", backgroundColor: "orange" }}>CHANGE PASSWORD HERE</DialogTitle>
                <DialogContent>
                    <div className='flex flex-row gap-8 justify-center items-center'>
                        <img src="https://calendar.thehoneybunfoundation.com/lottie/anime1.gif" className='w-1/2 h-1/2 p-2 drop-shadow-2xl rounded-2xl' alt="" />
                        <div className="flex flex-col gap-8 justify-center">
                            <DialogContentText style={{ fontStyle: "Poppins", fontSize: "15px", color: "black", textAlign: "center" }}>
                                Update your password for enhanced security.
                            </DialogContentText>
                            <TextField autoFocus value={PasswordData.oldpassword} onChange={(e) => setPasswordData({ ...PasswordData, oldpassword: e.target.value })} required margin="dense" id="name" name="email" label="Enter Old Password" type="password" fullWidth variant="standard"
                            />
                            <TextField autoFocus value={PasswordData.newpassword} onChange={(e) => setPasswordData({ ...PasswordData, newpassword: e.target.value })} required margin="dense" id="name" name="email" label="Enter New Password" type="password" fullWidth variant="standard"
                            />
                            <TextField autoFocus value={PasswordData.newchangepassword} onChange={(e) => setPasswordData({ ...PasswordData, newchangepassword: e.target.value })} required margin="dense" id="name" name="email" label="Confirm New Password" type="password" fullWidth variant="standard"
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        border: '1px solid #FFA500', color: '#FFA500', marginRight: '10px', borderRadius: '5px', padding: '8px 16px', transition: 'background-color 0.3s, color 0.3s',
                    }} onClick={handleClose}>Cancel</Button>
                    <Button style={{
                        backgroundColor: '#FFA500', color: '#FFFFFF', borderRadius: '5px', padding: '8px 16px', transition: 'background-color 0.3s, color 0.3s',
                    }} type="submit" onClick={handleChangePassword}>Update</Button>
                </DialogActions>
            </Dialog>
        </nav>
    );
};

export default Navbar;