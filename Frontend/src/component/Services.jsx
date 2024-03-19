import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  offset: 200,
  duration: 1300,
  easing: 'ease-in-out',
  once: true,
});

const Services = () => {
  return (
    <div className='h-full w-full mx-auto p-8 flex flex-col gap-4 items-center  drop-shadow-lg rounded-3xl bg-stone-800 '>
      <p className='font-bold font-[Poppins] text-6xl text-center text-orange-600  ' data-aos="zoom-in">Our Services</p>
      <div class="bg-orange-900 h-2 w-56 rounded"></div>

      <div className="flex flex-row gap-10 w-full justify-center h-full items-center ">
        {/* Service 1 */}
        <div data-aos="fade-right" className="w-[500px] p-1 flex flex-col items-center gap-8 border-b-8 pr-8 rounded-2xl border-orange-400 mt-5 hover:bg-gradient-to-t from-transparent to-orange-500 transition duration-300 hover:scale-105">
          <img className='w-40 h-50 rounded-full drop-shadow-2xl' src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-orange.png" />
          <div className="ml-3">
            <p className="font-bold text-xl text-orange-500 font-[Poppins] ">User Account Management</p>
            <p className='font-[Poppins] mt-5 text-white font-normal mb-2'>Create an account for a better ordering experience. Save favorites, track orders, and customize preferences. Enjoy a seamless journey every visit.</p>
          </div>
        </div>


        {/* Service 2 */}
        <div data-aos="fade-up" className="flex w-[500px] p-1 items-center gap-8 flex-col border-b-8 pr-8 rounded-2xl border-blue-500 mt-8 hover:bg-gradient-to-t from-transparent to-blue-500 transition duration-300">
          <img className='w-30 h-40 rounded-full drop-shadow-2xl' src="https://cdn0.iconfinder.com/data/icons/work-from-home-18/512/FoodDelivery-food-delivery-meal-order-512.png" />
          <div className="ml-3">
            <p className="font-bold text-xl text-blue-500 font-[Poppins] ">Effortless Food Ordering</p>
            <p className='font-normal font-[Poppins] mt-5 text-white mb-10'>Explore a diverse menu with ease. Effortlessly navigate and order your favorite meals in just a few clicks.</p>
          </div>
        </div>


        <div data-aos="fade-down" className="w-[500px]  flex flex-col  items-center gap-12  border-b-8 pr-8 rounded-2xl border-green-500 mt-12 hover:bg-gradient-to-t from-transparent to-green-500 transition duration-700">
          <img className='w-40 h-50 rounded-full drop-shadow-2xl' src="https://png.pngtree.com/png-vector/20220628/ourmid/pngtree-pay-tax-icon-green-logo-png-image_5550560.png" />
          <div className="ml-3">
            <p className="font-bold text-xl text-green-500 font-[Poppins] ">Secure Online Payments</p>
            <p className='font-normal font-[Poppins] mt-5 text-white mb-6'>Safely make online payments with ease. Enjoy secure transactions and choose from various payment methods.</p>
          </div>
        </div>

        {/* Service 2 */}
        <div data-aos="fade-left" className="flex w-[500px] items-center gap-8 flex-col border-b-8 pr-8 rounded-2xl border-red-500 mt-12 hover:bg-gradient-to-t from-transparent to-red-500 transition duration-300">
          <img className='w-30 h-40 rounded-full drop-shadow-2xl' src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-512.png" />
          <div className="ml-3">
            <p className="font-bold text-xl text-red-500 font-[Poppins] ">Real-time Order Tracking</p>
            <p className='font-normal font-[Poppins] mt-5 text-white mb-8'>Track your order in real-time. Get updates from preparation to delivery and contact the delivery partner directly for peace of mind.</p>
          </div>
        </div>


      </div>
      <div className="flex flex-row gap-10 w-full justify-center h-full items-center ">
        {/* Service 1 */}



      </div>




    </div>
  );
};

export default Services;
