import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ImageSlider from '../../Components/ImageSlider/ImageSlider'
import ClientNotice from '../../Components/ClientNotice/ClientNotice'
import Escorts from '../../Components/Escorts/Escorts'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <ImageSlider />
        <ClientNotice />
        <Escorts />
    </div>
  )
}

export default Homepage