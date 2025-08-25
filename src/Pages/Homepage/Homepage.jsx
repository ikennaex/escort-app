import React from 'react'
import ImageSlider from '../../Components/ImageSlider/ImageSlider'
import ClientNotice from '../../Components/ClientNotice/ClientNotice'
import Escorts from '../../Components/Escorts/Escorts'

const Homepage = () => {
  return (
    <div>
        <ImageSlider />
        <ClientNotice />
        <Escorts />
    </div>
  )
}

export default Homepage