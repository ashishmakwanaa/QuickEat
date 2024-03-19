import React from 'react'
import Navbar from '../component/Navbar'
import Carousel from '../component/Carousel'
import AboutUs from '../component/AboutUs'
import Services from '../component/Services'
import Contact from '../component/contact'
import Footer from '../component/Footer'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Carousel/>
      <AboutUs id="about-us"/>
      <Services id="services"/>
      <Contact id="contact"/>
      <Footer />
    </div>
  )
}

export default Homepage
