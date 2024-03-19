import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
   offset: 200,
   duration: 1300,
   easing: 'ease-in-out',
   once: true,
 });

const AboutUs = () => {
    return (
        <div className='mb-10 flex flex-row font-[Poppins]'>
            <div className='px-5 py-3 mt-10 ml-10 rounded-xl relative w-[55%] shadow-2xl '>
                <p className='font-bold font-[Poppins] text-6xl text-orange-500 mb-4 ml-12' data-aos="fade-right">Who We Are</p>

                <div className='relative flex items-center mt-10 ml-10'>
                    <p className='text-lg mb-6 text-orange-500 pl-4 font-bold'  data-aos="fade-right">
                        &rarr;  At QuickEat, we are passionate about delivering a delightful culinary experience right to your doorstep. Our journey began with a simple yet profound goal - to redefine the way you savor and enjoy food.
                    </p>
                </div>

                <div className='relative flex items-center ml-10 ' >
                    <p className='text-lg mb-6 text-black pl-4 font-bold'data-aos="fade-right">
                        &rarr; At the heart of our mission is a dedication to customer satisfaction. We take pride in providing a seamless and user-friendly ordering experience, coupled with timely and reliable delivery services.
                    </p>
                </div>
                <div className='relative flex items-center ml-10 mb-20' >
                    <p className='text-lg text-orange-500 pl-4 font-bold' data-aos="fade-right">
                        &rarr; Join us on this gastronomic journey, where every bite tells a story, and every order is an opportunity to share in the joy of good food.
                    </p>
                </div>
            </div>
            <div className='' data-aos="fade-left">
                <img className='w-full h-full ml-28 mt-10 transform transition-transform duration-300 hover:scale-105' src="https://www.shutterstock.com/image-illustration/group-stylized-orange-people-stand-260nw-163098557.jpg" alt="" />
            </div>
        </div>
    );
};

export default AboutUs;
