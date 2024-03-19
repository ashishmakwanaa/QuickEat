import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../LoginState/Loginstate';
import Swal from 'sweetalert2';

const AddItem = () => {
    const navigate = useNavigate();
    const StateContext = useContext(LoginContext)
    const [fillAllField, setAllField] = useState(true);
    const [Fooddata, setFooddata] = useState({
        name: "",
        desc: "",
        price: "",
        qty: "",
        img: "https://user-images.githubusercontent.com/11474775/72835684-ffb03180-3cac-11ea-88d7-82d5229c47ac.png",
        offer:"",
    })

    async function addItem() {
        const response = await fetch("http://localhost:4000/add/addItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Fooddata)
        })

        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                title: "Item Added Successfully",
                icon: "success",
                timer: 3000
            })
        }
        console.log(data)
    }
    const handleSubmit = (e) => {
        console.log(Fooddata)
        try {
            e.preventDefault();
            if (Fooddata.name === '' || Fooddata.desc === '' || Fooddata.price === '' || Fooddata.qty === '' || Fooddata.img === ''|| Fooddata.offer === '') {
                Swal.fire({
                    title: "Please Enter All The Field",
                    icon: "warning",
                    timer: 1000
                })
                setAllField(false);
            }
            else {

                addItem();
                { fillAllField && StateContext.login && navigate("/") }
            }
        } catch (error) {
            window.alert(error);
        }
        console.log(fillAllField)
        // console.log(StateContext.login)

    }
    const accessKey = "a4mMmS84fey6hObwQS_BnYxSWcQRXnNGM-rGCq_1A6w";

    const GenerateImage = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${Fooddata.name}&client_id=${accessKey}`)

            const data = await response.json();
            if (response.ok) {
                setFooddata(prev => ({
                    ...prev,
                    img: data.urls.regular,
                }))
            }
            else {
                console.error("Failed To Fetch Image", data.errors)
            }
        } catch (error) {
            window.alert(error)
        }
    }

    return (
        <div className="relative bg-[url('https://www.shutterstock.com/image-vector/set-healthy-unhealthy-products-fast-600nw-2253591061.jpg')] bg-cover bg-center bg-no-repeat backdrop-blur-lg bg-opacity-100 p-8 rounded-lg h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className='absolute inset-0 flex flex-col gap-4 bg-gray-50 w-1/2 h-[620px] mx-auto p-5 mt-12 rounded-xl' style={{ boxShadow: "0 0 2em orange" }} data-aos="fade-left">
                <h3 className='text-xl font-bold font-[Poppins] text-center text-orange-500'>ADD FOOD ITEM</h3>
                <div className="flex flex-col justify-start gap-5">
                    <div className="flex flex-col gap-2 items-start  w-full md:w-[55%]" data-aos="fade-left">
                        <label htmlFor="restaurantName" className='font-bold font-[Poppins]'>Item's Name</label>
                        <input
                            type="text"
                            id="itemaname"
                            name="itemName"
                            value={Fooddata.name}
                            onChange={(e) => setFooddata({ ...Fooddata, name: e.target.value })}
                            placeholder='Enter Item Name'
                            className="p-2 rounded-md border-2 border-orange-500 w-[700px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-start w-full md:w-[55%]" data-aos="fade-left">
                        <label htmlFor="restaurantName" className='font-bold  font-[Poppins]'>Item's Description</label>
                        <textarea
                            type="text"
                            id="itemdesc"
                            name="itemdesc"
                            value={Fooddata.desc}
                            onChange={(e) => setFooddata({ ...Fooddata, desc: e.target.value })}
                            placeholder='Enter Item Description'
                            className="p-2 rounded-md border-2 border-orange-500 w-[700px] h-28"
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-2  w-full" data-aos="fade-left">

                            <label htmlFor="address" className='font-bold font-[Poppins]'>Item's Quantity</label>
                            <input
                                id="qty"
                                name="qty"
                                type='number'
                                value={Fooddata.qty}
                                onChange={(e) => {
                                    setFooddata({ ...Fooddata, qty: e.target.value })
                                }}
                                placeholder='Enter Item Quantity'
                                className="p-2 rounded-md border-2 border-orange-500 w-full"
                            />

                        </div>
                        <div className="flex flex-col gap-2 items-start w-full" data-aos="fade-left">
                            <label htmlFor="address" className='font-bold font-[Poppins]'>Item's Price:</label>
                            <input
                                id="price"
                                name="price"
                                type='text'
                                value={Fooddata.price}
                                onChange={(e) => setFooddata({ ...Fooddata, price: e.target.value })}
                                placeholder='Enter Item Price'
                                className="p-2 rounded-md border-2 border-orange-500 w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-start w-full" data-aos="fade-left">
                            <label htmlFor="address" className='font-bold font-[Poppins]'>Enter Offer:</label>
                            <input
                                id="price"
                                name="price"
                                type='number'
                                value={Fooddata.offer}
                                onChange={(e) => setFooddata({ ...Fooddata, offer: e.target.value })}
                                placeholder='Enter Item Price'
                                className="p-2 rounded-md border-2 border-orange-500 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col justify-start">
                            <label htmlFor="" className="font-bold font-[Poppins]">Item Image:</label>
                            <div className="p-2 w-[200px] h-[150px] rounded-md">
                                <img
                                    src={Fooddata.img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col row gap-2 w-full my-auto">
                            <button
                                onClick={GenerateImage}
                                className="w-full bg-orange-500 hover:text-orange-500 hover:bg-transparent transition-all duration-500 hover:border-orange-500 hover:border font-bold text-lg text-white p-2 mt-4 rounded-lg"
                            >
                                &larr; Generate Item Image
                            </button>
                            <button onClick={handleSubmit} className="w-full bg-orange-500 hover:text-orange-500 hover:bg-transparent transition-all duration-500 hover:border-orange-500 hover:border font-bold text-lg text-white p-2 mt-4 rounded-lg">
                                Add Item &rarr;
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}

export default AddItem
