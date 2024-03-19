import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../LoginState/Loginstate';
import Swal from 'sweetalert2';

const AddCustomer = () => {
    const navigate = useNavigate();
    const StateContext = useContext(LoginContext)
    const [email,setEmail]=useState(false);
    const [fillAllField,setAllField]=useState(true);
    const [CustomerData, setCustomerData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        phoneno: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
    })

    async function AddCustomer() {
        const response = await fetch("http://localhost:4000/add/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(CustomerData)
        })

        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                title: "Customer Added Successfully",
                icon: "success",
                timer: 3000
            })
        }
        console.log(data)
    }
    const handleClick = (e) => {
        console.log(CustomerData)
        try {
            e.preventDefault();
            if(CustomerData.firstname === '' || CustomerData.lastname === '' || CustomerData.emailid === '' || CustomerData.address === '' || CustomerData.city === '' || CustomerData.phoneno === '' || CustomerData.state === '' || CustomerData.pincode === '' ){
                Swal.fire({
                    title:"Please Enter All The Field",
                    icon:"warning",
                    timer:1000
                })
                setAllField(false);
            }
            else{

                AddCustomer();
                {fillAllField &&  StateContext.login && navigate("/") }
            }
        } catch (error) {
            window.alert(error);
        }
        console.log(fillAllField)
        // console.log(StateContext.login)

    }

    return (
        <div className="relative bg-[url('https://www.shutterstock.com/image-vector/set-healthy-unhealthy-products-fast-600nw-2253591061.jpg')] bg-cover bg-center bg-no-repeat backdrop-blur-lg bg-opacity-100 p-8 rounded-lg h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className='absolute inset-0 flex flex-col gap-4 bg-gray-50 w-[900px] h-[620px] mx-auto p-5 mt-12 rounded-xl'  style={{ boxShadow: "0 0 2em orange" }} data-aos="fade-right">
                <h3 className='text-xl font-bold font-[Poppins] text-center text-orange-500'>ADD CUSTOMER</h3>
                <div className="flex flex-col md:flex-row justify-start gap-5">
                    <div className="flex flex-col gap-2 items-start  w-full md:w-[55%]" data-aos="fade-right">
                        <label htmlFor="restaurantName" className='font-bold font-[Poppins]'>Customer's Firstname</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={CustomerData.firstname}
                            onChange={(e) => setCustomerData({ ...CustomerData, firstname: e.target.value })}
                            placeholder='Enter Customer Firstname'
                            className="p-2 rounded-md border-2 border-orange-500 w-[310px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-start w-full md:w-[55%]" data-aos="fade-right">
                        <label htmlFor="restaurantName" className='font-bold  font-[Poppins]'>Customer's Lastname</label>
                        <input
                            type="text"
                            id="customername"
                            name="customername"
                            value={CustomerData.lastname}
                            onChange={(e) => setCustomerData({ ...CustomerData, lastname: e.target.value })}
                            placeholder='Enter Customer Lastname'
                            className="p-2 rounded-md border-2 border-orange-500 w-[310px]"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full" data-aos="fade-right">
                    <label htmlFor="address" className='font-bold font-[Poppins]'>Email ID:</label>
                    <input
                        id="address"
                        name="address"
                        type='email'
                        value={CustomerData.emailid}
                        onChange={(e) => {
                            const emaill = e.target.value;
                            if(!emaill.includes("@")){
                                setEmail(true)
                            }
                            else{
                                setEmail("");
                            }
                            setCustomerData({ ...CustomerData, emailid: e.target.value })
                        }}
                        placeholder='Enter Email Address'
                        className="p-2 rounded-md border-2 border-orange-500 w-full"
                    />
                    {email && <p className='text-red-600 text-sm font-bold font-[Poppins]'>Please enter valid email address</p>}
                </div>

                <div className="flex flex-row md:flex-row justify-start gap-5">
                    <div className="flex flex-col gap-2 items-start w-full" data-aos="fade-right">
                        <label htmlFor="address" className='font-bold font-[Poppins]'>Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            value={CustomerData.address}
                            onChange={(e) => setCustomerData({ ...CustomerData, address: e.target.value })}
                            placeholder='Enter Restaurant Address'
                            className="p-2 rounded-md border-2 border-orange-500 w-[400px] h-32"
                        />
                    </div>
                    <div className='flex flex-col justify-start gap-2 mr-28'>
                        <div className="flex flex-col gap-2 items-start   w-full md:w-[55%]" data-aos="fade-right">
                            <label htmlFor="restaurantName" className='font-bold font-[Poppins]'> Contact No:</label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={CustomerData.phoneno}
                                onChange={(e) => setCustomerData({ ...CustomerData, phoneno: e.target.value })}
                                placeholder='Enter Customer Contact No'
                                className="p-2 rounded-md border-2 border-orange-500 w-[310px]"
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-start w-full md:w-[55%]" data-aos="fade-right">
                            <label htmlFor="restaurantName" className='font-bold font-[Poppins]'>State:</label>
                            <input
                                type="text"
                                id="customername"
                                name="customername"
                                value={CustomerData.state}
                                onChange={(e) => setCustomerData({ ...CustomerData, state: e.target.value })}
                                placeholder='Enter Customer State'
                                className="p-2 rounded-md border-2 border-orange-500 w-[310px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-row justify-start gap-5">
                    <div className="flex flex-col gap-2 items-start  w-full md:w-[55%]" data-aos="fade-right">
                        <label htmlFor="restaurantName" className='font-bold font-[Poppins]'>City:</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={CustomerData.city}
                            onChange={(e) => setCustomerData({ ...CustomerData, city: e.target.value })}
                            placeholder='Enter Customer City'
                            className="p-2 rounded-md border-2 border-orange-500 w-[400px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full md:w-[55%]" data-aos="fade-right">
                        <label htmlFor="restaurantName" className='font-bold font-[Poppins]'>Pincode:</label>
                        <input
                            type="text"
                            id="customername"
                            name="customername"
                            value={CustomerData.pincode}
                            onChange={(e) => setCustomerData({ ...CustomerData, pincode: e.target.value })}
                            placeholder='Enter Customer Pincode'
                            className="p-2 rounded-md border-2 border-orange-500 w-[400px]"
                        />
                    </div>
                </div>
                <button onClick={handleClick} className='w-full bg-orange-500 hover:text-orange-500 hover:bg-transparent transition-all duration-500 hover:border-orange-500 hover:border font-bold text-lg text-white p-2 mt-4 rounded-lg'>Add Customer &rarr;</button>
            </div>
        </div>


    )
}

export default AddCustomer
