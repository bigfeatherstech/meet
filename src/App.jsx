import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import BackToTopButton from './BottomToTop/BackToTopButton';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import CareerPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';
function App() {
  return (
    <>
      <Navbar />
      {/* <Homepage/> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      <Footer />
      <BackToTopButton/>
    </>
  );
}

export default App;




