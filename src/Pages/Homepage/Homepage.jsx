import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ImageSlider from '../../Components/ImageSlider/ImageSlider'
import ClientNotice from '../../Components/ClientNotice/ClientNotice'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <ImageSlider />
        <ClientNotice />
    </div>
  )
}

export default Homepage