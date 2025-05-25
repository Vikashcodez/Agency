import React from 'react'
import WorldTrekHero from '../componets/Hero'
import Packages from '../componets/package'
import PopularPalaces from '../componets/Popular'
import TravelEnquiry from '../componets/enqury'
import Footer from '../componets/Footer'

const Home = () => {
  return (
    <>
    <WorldTrekHero />
    <TravelEnquiry />
    <Packages />
   <PopularPalaces />
   
   <Footer />
    
    </>
  )
}

export default Home