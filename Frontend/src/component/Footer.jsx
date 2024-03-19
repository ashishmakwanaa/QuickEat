import React from 'react';
import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  offset: 200,
  duration: 1300,
  easing: 'ease-in-out',
  once: true,
});


const Footer = () => {
  return (
    <div className='w-full h-full bg-[#0a1625] text-center flex flex-col gap-4 font-[Poppins] justify-center items-center p-5'>
      <div className="flex flex-row gap-10 text-white text-center "  >
        <a href='#' className='transition duration-300 text-orange-500 hover:text-white' data-aos="fade-down">Terms & Condition</a>
        <a href='#' className='hover:text-orange-500 transition duration-300' data-aos="fade-down">Home</a>
        <a href='#' className='hover:text-orange-500 transition duration-300' data-aos="fade-down">About Us</a>
        <a href='#' className='hover:text-orange-500 transition duration-300' data-aos="fade-down">Services</a>
        <a href='#' className='hover:text-orange-500 transition duration-300' data-aos="fade-down">Contact Us</a>
      </div>
      <div className='text-center justify-between items-center p-5 w-[1000px]'>
        <p className='text-sm text-gray-400' data-aos="fade-left">" By accessing and using the QuickEat platform, both restaurant owners and customers agree to the following terms and conditions. QuickEat provides a seamless dining experience, connecting customers with their favorite restaurants for home delivery or table reservations. Users must adhere to our ordering and payment processes, ensuring accurate transactions and timely deliveries. In the event of cancellations or issues, our policy outlines fair procedures for refunds and dispute resolution. QuickEat prioritizes food quality and safety, maintaining high standards for our partnered restaurants. Users are encouraged to review and comply with these terms, promoting a secure and enjoyable culinary journey for everyone involved. "</p>
      </div>
      <div className="flex flex-row items-center gap-6 text-center">
        <div
          className="p-2 w-12 h-12 rounded-full bg-[#0C2D57] flex items-center justify-center cursor-pointer transition duration-300 hover:bg-blue-700 hover:duration-300"
          style={{ boxShadow: "0 0 1em orange" }}
        >
          <TfiFacebook className='text-white text-2xl' />
        </div>

        <div className="p-2 w-12 h-12 rounded-full bg-[#0C2D57] flex items-center justify-center cursor-pointer transition duration-300 hover:bg-pink-600 hover:shadow-lg hover:shadow-orange" style={{ boxShadow: "0 0 1em orange" }}>
          <FaInstagram className='text-white text-2xl' />
        </div>
        <div className="p-2 w-12 h-12 rounded-full bg-[#0C2D57] flex items-center justify-center cursor-pointer transition duration-300 hover:bg-blue-400 hover:shadow-lg hover:shadow-orange" style={{ boxShadow: "0 0  1em orange" }}>
          <FaTwitter className='text-white text-2xl' />
        </div>
        <div className="p-2 w-12 h-12 rounded-full bg-[#0C2D57] flex items-center justify-center cursor-pointer transition duration-300 hover:bg-blue-900 hover:shadow-lg hover:shadow-orange" style={{ boxShadow: "0 0  1em orange" }}>
          <FaLinkedin className='text-white text-2xl' /> 
        </div>
      </div>
    </div>
  );
};

export default Footer;
