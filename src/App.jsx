import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import BackToTopButton from './BottomToTop/BackToTopButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import CareerPage from './pages/CareerPage';
import ContactPage from './pages/ContactPage';

// Import AOS CSS
import 'aos/dist/aos.css';
import AOS from 'aos';
import NotFound from './pages/NOTFOUND/NotFound';
import ProductDetailPage from './pages/PRODUCTDETAIL/ProductDetailPage';
import AdminDashboard from './ADMIN/AdminDashboard';

function App() {
  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    // Refresh AOS on route change
    const handleRouteChange = () => {
      AOS.refresh();
    };

    // You might want to refresh AOS when the route changes
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all route - must be last */}
          <Route path="*" element={<NotFound />} />



          {/* ADMIN ROUTES DANGER-ZONE */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;





