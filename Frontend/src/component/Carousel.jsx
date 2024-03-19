import React, { useState, useEffect } from 'react';
import Typed from 'react-typed';
import { FaCartArrowDown } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

AOS.init({
    offset: 200,
    duration: 1300,
    easing: 'ease-in-out',
    once: true,
});

const Carousel = () => {

    const navigate = useNavigate();
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [isForward, setIsForward] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0)

    const statements = [
        'Elevating Home Dining to Gourmet Excellence,',
        'Your Restaurant, Your Rules, Delivered to Your Doorstep,',
        'From Chef Creation to Your Table - Culinary Bliss Awaits,',
        'Seamless Dining, Effortless Enjoyment for Every Occasion,'
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % 6);
            console.log(currentIndex)
        }, 3000);
        return () => clearInterval(interval)
    }, [currentIndex])

    useEffect(() => {
        const typingInterval = setInterval(() => {
            setIsForward(true); // Set to forward before starting typing
            setCurrentStatementIndex((prevIndex) => (prevIndex + 1) % statements.length);
        }, 5000); // Change the delay based on your preference

        return () => clearInterval(typingInterval); // Clear interval to avoid memory leaks
    }, [statements.length]);

    const handleComplete = () => {
        setIsForward(false); // Set to reverse after typing completes
    };

    return (
        <div className='relative bg-cover bg-center h-screen flex flex-column rounded-3xl' style={{ backgroundImage: 'url(https://www.nicdarkthemes.com/themes/restaurant/wp/demo/intro/img/parallax/splash-header-2.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-60 rounded-3xl"></div>
            <div className="flex items-center justify-between p-8 absolute inset-0">
                {/* Left side */}
                <div className="font-[Poppins] text-left text-white z-10 w-1/2">
                    <div style={{ height: '100px' }} data-aos="zoom-in">

                        <h1 className="text-4xl font-bold text-orange-400 ">
                            <Typed
                                strings={[statements[currentStatementIndex]]}
                                typeSpeed={50}
                                showCursor={false}
                                onComplete={handleComplete}
                                startDelay={isForward ? 1000 : 0} // Add delay when playing backward
                                backSpeed={isForward ? 10 : undefined} // Adjust backSpeed only when playing backward
                                loopCount={0} // Loop indefinitely
                            />
                        </h1>
                    </div>
                    <p className="text-lg mb-4 font-extrabold" data-aos="zoom-in">
                        Explore a world of delightful flavors brought to your doorstep by QuickEat.
                    </p>
                    <p className="text-lg font-extrabold" data-aos="zoom-in">
                        From hearty breakfasts to savory dinners, QuickEat has a menu that caters to every craving.
                    </p>
                    <button onClick={() => navigate("/login")} data-aos="zoom-in" className="bg-orange-500 hover:text-orange-500 flex items-center hover:bg-white font-bold  text-white py-2 px-4 mt-10 rounded-md">
                        Take The Order <FaCartArrowDown className='ml-2' />
                    </button>
                </div>

                <div className="z-10 w-[700px] h-[400px]  flex gap-[10px]" >
                    {/* Replace this with your actual image */}
                    <div className="relative w-[400px] ml-48 h-80 overflow-hidden rounded-2xl" >
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/022/559/426/small/american-cheese-bbq-beef-with-tomato-lettuce-juicy-beef-burger-fast-food-presentation-studio-product-isolated-on-white-background-photo.jpg"
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 0 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />
                        <img
                            src="https://media.istockphoto.com/id/184098729/photo/vegetarian-pizza-03.jpg?s=612x612&w=0&k=20&c=03W_1y9fEfVs_h04DR0S7vaA_u3BXtgLYoXs8TGxF28="
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 1 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />
                        <img
                            src="https://www.everybuckcounts.com/wp-content/uploads/2018/07/cheap-healthy-foods.jpg"
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 2 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />
                        <img
                            src="https://ds393qgzrxwzn.cloudfront.net/resize/m500x500/cat1/img/images/0/fPTr5x1B65.jpg"
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 3 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHN8ZW58MHx8MHx8fDA%3D"
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 4 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />
                        <img
                            src="https://media.istockphoto.com/id/824753432/photo/thukpa-is-a-tibetan-noodle-soup-which-originated-in-the-eastern-part-of-tibet-amdo-thukpa-is-a.webp?b=1&s=170667a&w=0&k=20&c=DsPCxtz_UZbwRBW07K7ucFN3A-m-d5orpCknlP5b7VM="
                            alt="Restaurant Image"
                            className={`w-[400px] absolute inset-0 h-full rounded-2xl transition-all duration-1000 ease-in ${currentIndex === 5 ? 'scale-100' : 'scale-0 rotate-180'}`}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Carousel;
