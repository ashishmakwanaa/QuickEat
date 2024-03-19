import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import 'aos/dist/aos.css';
import AOS from 'aos'
import { useNavigate } from 'react-router-dom';

AOS.init({
    offset: 200,
    duration: 1300,
    easing: 'ease-in-out',
    once: true,
});

const CustomerList = () => {

    const [customerData, setCustomerData] = useState([]);
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState([]);
    const navigate = useNavigate();

    const getRandomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }


    const [currentPage, setCurrentPage] = useState(1);
    const CustomerPerPage = 6;
    const indexOfLastCustomer = currentPage * CustomerPerPage;
    const indexofFirstCustomer = indexOfLastCustomer - CustomerPerPage;
  

    const TotalPage = Math.ceil(customerData.length / CustomerPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= TotalPage) {
            setCurrentPage(pageNumber)
        }
    }

    const handleClickOpen = (customer) => {
        setOpen(true);
        console.log(customer)
        setEditCustomer(customer);
    }
    console.log(editCustomer);
    const handleClose = () => {
        setOpen(false);
    }


    const handleOrder = (id)=>{
        navigate(`/order/${id}`)
    }

    const handleEditCustomer = async (editCustomer) => {
        
        if (!editCustomer.firstname || !editCustomer.lastname || !editCustomer.emailid || !editCustomer.address || !editCustomer.phoneno || !editCustomer.state || !editCustomer.city || !editCustomer.pincode) {
            Swal.fire({
                title: "Please Enter All Fields",
                icon: "warning",
                button: false,
                timer: 1000

            })
        }
        setOpen(false)
        const confirm = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          })

          if(confirm.isConfirmed){
              console.log(editCustomer);
              const id = editCustomer._id;
              const response = await fetch(`http://localhost:4000/update/editCustomer/${id}`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(editCustomer)
                })
                const data = await response.json();
                if (response.ok) {
                    
                    setOpen(false)
                    Swal.fire({
                        title: "Customer Update Successfully",
                        icon: "success",
                        timer: 2000
                    })
                }
                FetchData()
            }
        }
        

    const handelDeleteCustomer = async (customer) => {
        const confirm = await Swal.fire({
            title: "Are You Sure You Want to Delete This Customer?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
    
        if (confirm.isConfirmed) {
            const id = customer._id;
    
            try {
                const response = await fetch(`http://localhost:4000/delete/deleteCustomer/${id}`, {
                    method: "DELETE"
                });
    
                console.log("Response status:", response.status);
    
                const data = await response.json();
                console.log("Response data:", data);
    
                if (response.ok) {
                    Swal.fire({
                        title: "Delete Successful",
                        icon: "success",
                        timer: 1000
                    });
                    FetchData();
                } else {
                    Swal.fire({
                        title: "Delete Failed",
                        text: data.message || "Failed to delete customer. Please try again later.",
                        icon: "error"
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                window.alert("An error occurred while deleting the customer. Please try again later.");
            }
        }
    };
    

    async function FetchData() {
        const response = await fetch("http://localhost:4000/getData/customers");
        const data = await response.json();
        // console.log(data);
        setCustomerData(data.customer);
    }
    useEffect(() => {
        FetchData();
    }, [])



    console.log(customerData)

    return (
        <div className='flex flex-col gap-3 justify-center items-center'>
            <input type="text" name="" id="" value={query} data-aos="fade-right" onChange={(e) => setQuery(e.target.value)} className='border text-lg border-orange-500 rounded-lg placeholder:font-[Poppins] w-1/2 p-2' placeholder='Search Customer Here' />
            <div className='ml-8 mt-8 flex flex-col justify-center items-center'>
                <div class="overflow-x-auto">
                    <table class="w-full table-auto" data-aos="fade-right">
                        <thead>
                            <tr class="bg-stone-900 text-white  text-lg p-2">
                                <th class="px-8 py-2 rounded-tl-xl text-white font-normal font-[Poppins] text-md text-center">Id</th>
                                <th class="px-8 py-3 text-white font-normal font-[Poppins] text-md text-center">Profile</th>
                                <th class="px-8 py-2 text-white font-normal font-[Poppins] text-md text-center">Fistname</th>
                                <th class="px-8 py-2 text-white font-normal font-[Poppins] text-md text-center">Lastname</th>
                                <th class="px-6 py-2 text-white font-normal font-[Poppins] text-md text-center">Contact</th>
                                <th class="px-6 py-2 text-white font-normal font-[Poppins] text-md text-center">Take Order</th>
                                <th class="px-6 py-2 text-white font-normal font-[Poppins] text-md text-center">Edit</th>
                                <th class="px-6 py-2 rounded-tr-xl text-white font-normal font-[Poppins] text-md text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customerData
                                .filter((customer) => customer.firstname.toLowerCase().includes(query))
                                .slice(indexofFirstCustomer, indexOfLastCustomer).map((customer, index) => {
                                    const originalIndex = customerData.findIndex((c) => c._id === customer._id);
                                    return(
                                    <tr className={`text-center capitalize hover:border-2 ${CustomerPerPage === index ? "rounded-bl-xl rounded-br-xl":""} hover:border-black hover:rounded-lg`} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e5e5e5' }} key={customer._id} >
                                        <td class='px-4 py-2 m-2 bg-[1F3F49] border-gray-300  border'>
                                            <p class='bg-gray-700 text-sm text-white  w-10 h-10 rounded-full flex justify-center items-center'>
                                                {originalIndex + 1}
                                            </p>
                                        </td>
                                        <td className='border font-normal text-sm text-center  border-gray-300 px-4 py-2 rounded bg-[1F3F49] m-auto font-[Poppins]'><p className=" text-white w-10 h-10 rounded-full text-md font-bold m-auto cursor-pointer p-2" style={{ backgroundColor:getRandomColor() }}>{customer.firstname[0].toUpperCase()}{customer.lastname[0].toUpperCase()}</p></td>
                                        <td className="border font-normal text-sm text-center  border-gray-300 px-4 py-2 font-[Poppins]"><p className='text-lg text-center'>{customer.firstname}</p></td>
                                        <td className="border font-normal text-sm text-center  border-gray-300 px-4 py-2 font-[Poppins]"><p className="text-lg text-center">{customer.lastname}</p></td>
                                        <td className="border font-normal text-sm text-center  border-gray-300 px-4 py-2 font-[Poppins]"><p className='text-lg text-center'>{customer.phoneno}</p></td>
                                        <td className="border font-normal text-sm text-center  border-gray-300 px-4 py-2 font-[Poppins]"><p className='text-lg text-center text-orange-500 cursor-pointer' onClick={()=>handleOrder(customer._id)}>Order &rarr;</p> </td>
                                        <td className="border font-normal text-sm border-gray-300 px-4 py-2 font-[Poppins] cursor-pointer text-blue-800 text-center">
                                            <p className='text-xl inline-block align-middle' onClick={() => handleClickOpen(customer)}>
                                                <MdEdit />
                                            </p>
                                        </td>
                                        <td className="border font-normal text-sm border-gray-300 px-4 py-2 font-[Poppins] cursor-pointer text-red-800 text-center">
                                            <p className='text-xl inline-block align-middle' onClick={() => handelDeleteCustomer(customer)}>
                                                <MdDelete />
                                            </p>
                                        </td>


                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                    <div className="mt-4 flex items-center justify-end fixed bottom-10 right-20 left-0 z-50" >
                        <button className={`mx-2 text-sm drop-shadow-2xl p-2  border-2 border-orange-500 text-orange-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : "hover:bg-orange-500 hover:text-white rounded-md shadow-lg transition duration-500"}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &larr; Previous
                        </button>
                        {
                            Array.from({ length: TotalPage }, (_, i) => i + 1).map(pageNumber => (
                                <button key={pageNumber} className={`mx-2 text-sm p-2 border-2 border-orange-500 ${currentPage === pageNumber ? 'bg-orange-500 text-white rounded-lg w-10 shadow-lg' : "hover:bg-orange-500 hover:text-white rounded-lg w-10 shadow-lg transition duration-500"}`}>
                                    {pageNumber}
                                </button>
                            ))
                        }
                        <button className={`mx-2 text-sm drop-shadow-2xl p-2 border-2 border-orange-500 text-orange-500 ${currentPage === TotalPage ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : "hover:bg-orange-500 transition duration-500 hover:text-white rounded-md shadow-lg"}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === TotalPage}
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>

            </div>
            <Dialog
                style={{ borderRadius: "20px" }}
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
                <DialogTitle style={{ textAlign: "center", fontFamily: "Poppins", fontSize: "20px", color: "orange", fontWeight: "bold" ,color: "white", backgroundColor: "orange" }}>EDIT CUSTOMER</DialogTitle>
                <DialogContent className='mt-4' style={{ height: '600px', width: "600px", overflowY: 'auto' }}>
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="First Name" value={editCustomer.firstname} onChange={(e) => setEditCustomer({ ...editCustomer, firstname: e.target.value })} type="text" fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="Last Name" type="text" value={editCustomer.lastname} onChange={(e) => setEditCustomer({ ...editCustomer, lastname: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="Email Address" type="email" value={editCustomer.emailid} onChange={(e) => setEditCustomer({ ...editCustomer, emailid: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="Contact No" type="number" value={editCustomer.phoneno} onChange={(e) => setEditCustomer({ ...editCustomer, phoneno: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="Address" type="text" value={editCustomer.address} onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="State" type="text" value={editCustomer.state} onChange={(e) => setEditCustomer({ ...editCustomer, state: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="City" type="text" value={editCustomer.city} onChange={(e) => setEditCustomer({ ...editCustomer, city: e.target.value })} fullWidth variant="standard"
                    />
                    <TextField style={{ marginBottom: "1rem" }} autoFocus required margin="dense" id="name" name="email" label="Pincode" type="text" value={editCustomer.pincode} onChange={(e) => setEditCustomer({ ...editCustomer, pincode: e.target.value })} fullWidth variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{
                        border: '1px solid #FFA500', color: '#FFA500', marginRight: '10px', borderRadius: '5px', padding: '8px 16px', transition: 'background-color 0.3s, color 0.3s',
                    }} className="border border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600">Cancel</Button>
                    <Button onClick={() => handleEditCustomer(editCustomer)} style={{
                        backgroundColor: '#FFA500', color: '#FFFFFF', borderRadius: '5px', padding: '8px 16px', transition: 'background-color 0.3s, color 0.3s',
                    }} className="bg-orange-500 text-white hover:bg-orange-600">Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default CustomerList;
