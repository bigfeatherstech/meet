import React from 'react'
import HeroSection from '../components/Herosection'
import AboutSection from '../components/HomeCompo/AboutSection'
import TestimonialSection from '../components/HomeCompo/TestimonialSection'
import ProductSlider from '../components/HomeCompo/ProductSlider'

export default function Homepage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductSlider  />
      <TestimonialSection />
    </>

  )
}
