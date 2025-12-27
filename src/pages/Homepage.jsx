import React from 'react'
import HeroSection from '../components/Herosection'
import AboutSection from '../components/HomeCompo/AboutSection'
import TestimonialSection from '../components/HomeCompo/TestimonialSection'
import ProductSlider from '../components/HomeCompo/ProductSlider'
import CTABanner from '../components/HomeCompo/CTABanner'

export default function Homepage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductSlider  />
      <CTABanner/>
      <TestimonialSection />
    </>

  )
}
