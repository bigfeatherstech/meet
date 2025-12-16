import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import BackToTopButton from './BottomToTop/BackToTopButton';

function App() {
  return (
    <>
      <Navbar />
      <Homepage/>
      <Footer />
      <BackToTopButton/>
    </>
  );
}

export default App;




