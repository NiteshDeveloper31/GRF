import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  // Lift products catalog state to persist in RAM across page changes
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-charcoal text-white selection:bg-brand-orange/30">
        {/* Sticky Header */}
        <Navbar />

        {/* Dynamic Pages */}
        <main className="flex-grow pt-16">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  products={products} 
                  setProducts={setProducts} 
                  loading={productsLoading} 
                  setLoading={setProductsLoading} 
                  error={productsError} 
                  setError={setProductsError} 
                />
              } 
            />
            <Route 
              path="/products" 
              element={
                <Products 
                  products={products} 
                  setProducts={setProducts} 
                  loading={productsLoading} 
                  setLoading={setProductsLoading} 
                  error={productsError} 
                  setError={setProductsError} 
                />
              } 
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />

        {/* Floating FAQ Chatbot Widget */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
