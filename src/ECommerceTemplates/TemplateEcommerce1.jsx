import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = (typeof window !== 'undefined' && window.APP_CONFIG?.apiBaseUrl) || 'https://dev-server-tvbl.onrender.com';

function TemplateEcommerce1({ components, ecommerceId }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const motion = typeof window !== 'undefined' ? window.motion?.motion : null;
  const SafeMotion = isMounted && motion ? motion.div : 'div';
  const {
    shopName = 'ShopEase',
    shopDescription = 'Your one-stop shop for all your needs.',
    email = 'contact@shopease.com',
    whatsapp = '',
    products = [],
    design = {
      primaryColor: '#2563EB',
      secondaryColor: '#16A34A',
      backgroundColor: '#F3F4F6',
      textColor: '#1F2937',
      fontFamily: 'sans-serif',
      borderRadius: '0.5rem',
      animationType: 'float',
      sectionPadding: '2rem',
      cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hoverEffect: 'scale',
    },
  } = components;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState({ items: [] });
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: null });
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setCart({ items: [] });
    setShowCart(false);
    setShowAddress(false);
    setShowAdmin(false);
    window.location.hash = '';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && ecommerceId) {
      console.log("Fetching user and cart data for ecommerceId:", ecommerceId);
      setIsLoggedIn(true);
      axios
        .get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("User data fetched:", res.data.user);
          setUser(res.data.user);
          setIsAdmin(res.data.user.isAdmin || false);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          if (err.response?.status === 401) {
            handleLogout();
          } else {
            setError('Failed to fetch user data. Please try again.');
          }
        });

      axios
        .get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('Cart data fetched:', res.data);
          setCart(res.data);
        })
        .catch((err) => {
          console.error('Error fetching cart:', err);
          setError('Failed to fetch cart. Please try again.');
        });
    }
  }, [ecommerceId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isAdmin && token && ecommerceId) {
      console.log('Fetching orders for admin');
      axios
        .get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log('Orders fetched:', res.data);
          setOrders(res.data);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
          setError('Failed to fetch orders. Please try again.');
        });
    }
  }, [isAdmin, ecommerceId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Handling login');
    const email = e.target.querySelector('#login-email').value;
    const password = e.target.querySelector('#login-password').value;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/login`, {
        email,
        password,
      });
      console.log('Login successful:', res.data);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setIsAdmin(res.data.user.isAdmin || false);
      setShowLogin(false);
      setError(null);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Handling signup');
    const name = e.target.querySelector('#signup-name').value;
    const email = e.target.querySelector('#signup-email').value;
    const password = e.target.querySelector('#signup-password').value;
    const phone = e.target.querySelector('#signup-phone').value;
    const whatsapp = e.target.querySelector('#signup-whatsapp').value;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/signup`, {
        name,
        email,
        password,
        phoneNumber: phone,
        whatsapp,
      });
      console.log('Signup successful:', res.data);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setShowSignup(false);
      setError(null);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data.error || 'Signup failed. Please try again.');
    }
  };

  const addToCart = async (productId) => {
    console.log('Adding to cart, productId:', productId);
    if (!isLoggedIn) {
      console.log('User not logged in, showing login form');
      setShowLogin(true);
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Added to cart:', res.data);
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.response?.data.error || 'Failed to add to cart.');
    }
  };

  const updateCartQuantity = async (productId, change) => {
    console.log('Updating cart quantity, productId:', productId, 'change:', change);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`,
        { productId, quantityChange: change },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Cart updated:', res.data);
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Update cart error:', err);
      setError(err.response?.data.error || 'Failed to update cart.');
    }
  };

  const removeFromCart = async (productId) => {
    console.log('Removing from cart, productId:', productId);
    try {
      const res = await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Removed from cart:', res.data);
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Remove from cart error:', err);
      setError(err.response?.data.error || 'Failed to remove from cart.');
    }
  };

  const handleCheckout = async () => {
    console.log('Handling checkout');
    if (!isLoggedIn) {
      console.log('User not logged in, showing login form');
      setShowLogin(true);
      return;
    }
    if (!user?.address) {
      console.log('No address, showing address form');
      setShowAddress(true);
      setError('Please add an address before checkout.');
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/order`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Order placed successfully');
      setCart({ items: [] });
      setShowCart(false);
      setError(null);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data.error || 'Failed to place order.');
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    console.log('Saving address');
    const addressData = {
      fullName: e.target.querySelector('#full-name').value,
      phone: e.target.querySelector('#phone').value,
      address: e.target.querySelector('#address').value,
      city: e.target.querySelector('#city').value,
      zip: e.target.querySelector('#zip').value,
      country: e.target.querySelector('#country').value,
    };
    try {
      await axios.put(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/address`,
        addressData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Address saved:', addressData);
      setUser({ ...user, address: addressData });
      setShowAddress(false);
      setError(null);
    } catch (err) {
      console.error('Save address error:', err);
      setError(err.response?.data.error || 'Failed to save address.');
    }
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    console.log('Adding new product:', newProduct);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required.');
      if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
        throw new Error('All product fields are required.');
      }

      const formData = new FormData();
      formData.append('file', newProduct.image);
      formData.append('upload_preset', 'EcommerceProducts');
      formData.append('folder', 'ecommerce_products');
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/drc8bufjn/image/upload`,
        formData
      );
      const imageUrl = uploadResponse.data.secure_url;

      await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/add-product`,
        { ...newProduct, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Product added successfully');
      setNewProduct({ name: '', description: '', price: 0, image: null });
      setError(null);
      alert('Product added successfully!');
    } catch (err) {
      console.error('Add product error:', err);
      setError(err.response?.data.error || err.message || 'Failed to add product.');
    }
  };

  const deleteProduct = async (productId) => {
    console.log('Deleting product, productId:', productId);
    try {
      await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/product/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Product deleted successfully');
      setError(null);
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Delete product error:', err);
      setError(err.response?.data.error || 'Failed to delete product.');
    }
  };

  const cancelOrder = async (orderId) => {
    console.log('Canceling order, orderId:', orderId);
    try {
      await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Order canceled successfully');
      setOrders(orders.filter((order) => order._id !== orderId));
      setError(null);
      alert('Order canceled successfully!');
    } catch (err) {
      console.error('Cancel order error:', err);
      setError(err.response?.data.error || 'Failed to cancel order.');
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getDynamicStyles = () => {
    let hoverStyles = '';
    if (design.hoverEffect === 'scale') {
      hoverStyles = 'transform: scale(1.03);';
    } else if (design.hoverEffect === 'lift') {
      hoverStyles = 'transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);';
    } else if (design.hoverEffect === 'glow') {
      hoverStyles = 'box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);';
    }

    return `
      @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
      @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      @keyframes fade { 0% { opacity: 0.7; } 50% { opacity: 1; } 100% { opacity: 0.7; } }
      @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      .custom-animation { animation: ${design.animationType} 3s ease-in-out infinite; }
      .hover-effect { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .hover-effect:hover { ${hoverStyles} }
      .gradient-text {
        background: linear-gradient(45deg, ${design.primaryColor}, ${design.secondaryColor});
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 3s linear infinite;
      }
      .sidebar { display: none; }
      .sidebar.open { display: block; }
      @media (min-width: 768px) { .sidebar { display: block; } }
      .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; justify-content: center; align-items: center; }
    `;
  };
  const closeAllViews = () => {
    console.log('Closing all views');
    setShowLogin(false);
    setShowSignup(false);
    setShowCart(false);
    setShowAddress(false);
    setShowAdmin(false);
    setIsMenuOpen(false);
  };
  return (
    <div
      style={{
        background: design.backgroundColor,
        color: design.textColor,
        fontFamily: design.fontFamily,
      }}
      className="min-h-screen flex flex-col"
    >
      <style dangerouslySetInnerHTML={{ __html: getDynamicStyles() }} />

      <header
        style={{ background: 'white', boxShadow: design.cardShadow }}
        className="shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => {
                console.log('Toggling menu, current state:', isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
              className="mr-4 text-gray-700 hover:text-blue-600 md:hidden"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <h1
              style={{ color: design.primaryColor }}
              className="text-2xl font-bold gradient-text"
            >
              {shopName}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: design.borderRadius }}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  style={{ color: design.textColor }}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
                <button
                  onClick={() => {
                    console.log('Showing cart');
                    closeAllViews();
                    setShowCart(true);
                  }}
                  className="relative text-gray-700 hover:text-blue-600"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {cart.items.length > 0 && (
                    <span
                      style={{ background: design.secondaryColor }}
                      className="absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  console.log('Showing login form');
                  closeAllViews();
                  setShowLogin(true);
                }}
                style={{ color: design.textColor }}
                className="text-gray-700 hover:text-blue-600"
              >
                <i className="fas fa-user"></i> Login
              </button>
            )}
          </div>
        </div>
      </header>

      <aside
        className={`sidebar fixed h-full z-40 bg-white shadow-md w-64 ${isMenuOpen ? 'open' : ''}`}
      >
        <div className="p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    console.log('Navigating to home');
                    closeAllViews();
                    window.location.hash = '';
                  }}
                  style={{ borderRadius: design.borderRadius }}
                  className="w-full text-left px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium hover-effect"
                >
                  <i className="fas fa-home mr-2"></i> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log('Navigating to items');
                    closeAllViews();
                    window.location.hash = 'items';
                  }}
                  style={{ borderRadius: design.borderRadius }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover-effect"
                >
                  <i className="fas fa-box-open mr-2"></i> Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log('Showing cart from sidebar');
                    closeAllViews();
                    setShowCart(true);
                  }}
                  style={{ borderRadius: design.borderRadius }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover-effect"
                >
                  <i className="fas fa-shopping-cart mr-2"></i> Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log('Showing address form');
                    closeAllViews();
                    setShowAddress(true);
                  }}
                  style={{ borderRadius: design.borderRadius }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover-effect"
                >
                  <i className="fas fa-address-book mr-2"></i> My Address
                </button>
              </li>
              {isAdmin && (
                <li>
                  <button
                    onClick={() => {
                      console.log('Showing admin dashboard');
                      closeAllViews();
                      setShowAdmin(true);
                    }}
                    style={{ borderRadius: design.borderRadius }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover-effect"
                  >
                    <i className="fas fa-user-shield mr-2"></i> Admin Dashboard
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>

      <main
        style={{ padding: design.sectionPadding }}
        className="flex-1 p-4 md:ml-64"
      >
        {showLogin && (
          <div className="modal-overlay">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-white rounded-lg p-6 hover-effect max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold gradient-text">Login</h2>
                <button
                  onClick={() => {
                    console.log('Closing login form');
                    setShowLogin(false);
                  }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                  type="submit"
                  style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                  className="w-full text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-center">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    console.log('Switching to signup form');
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </SafeMotion>
          </div>
        )}

        {showSignup && (
          <div className="modal-overlay">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-white rounded-lg p-6 hover-effect max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold gradient-text">Sign Up</h2>
                <button
                  onClick={() => {
                    console.log('Closing signup form');
                    setShowSignup(false);
                  }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="signup-name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="signup-phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="signup-phone"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="signup-whatsapp">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="signup-whatsapp"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                  type="submit"
                  style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                  className="w-full text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-4 text-center">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    console.log('Switching to login form');
                    setShowSignup(false);
                    setShowLogin(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </SafeMotion>
          </div>
        )}

        <div className={showLogin || showSignup || showCart || showAddress || showAdmin ? 'hidden' : ''}>
          <SafeMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-white rounded-lg p-6 hover-effect"
          >
            <h2 className="text-2xl font-bold mb-4 gradient-text">{shopName}</h2>
            <p className="text-gray-700 mb-4">{shopDescription}</p>
          </SafeMotion>

          <SafeMotion
            id="items"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-white rounded-lg p-6 mt-6 hover-effect"
          >
            <h2 className="text-2xl font-bold gradient-text mb-6">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length === 0 && (
                <p className="text-gray-500 col-span-4 text-center py-10">No products found</p>
              )}
              {filteredProducts.map((product) => (
                <SafeMotion
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg overflow-hidden hover-effect"
                  style={{ boxShadow: design.cardShadow }}
                >
                  <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 gradient-text">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      {isLoggedIn ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Adding product to cart:', product.id);
                            addToCart(product.id);
                          }}
                          style={{
                            background: design.primaryColor,
                            borderRadius: design.borderRadius,
                          }}
                          className="text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition hover-effect"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            console.log('Showing login form from add to cart');
                            closeAllViews();
                            setShowLogin(true);
                          }}
                          style={{
                            background: design.primaryColor,
                            borderRadius: design.borderRadius,
                          }}
                          className="text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition hover-effect"
                        >
                          Login to Add
                        </button>
                      )}
                    </div>
                  </div>
                </SafeMotion>
              ))}
            </div>
          </SafeMotion>
        </div>

        {showCart && (
          <div className="modal-overlay">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-white rounded-lg p-6 hover-effect max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold gradient-text">Your Cart</h2>
                <button
                  onClick={() => {
                    console.log('Closing cart');
                    setShowCart(false);
                  }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {cart.items.length === 0 ? (
                <div className="text-center py-10">
                  <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  {cart.items.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    return (
                      <div key={item.productId} className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center">
                          <img
                            src={product?.image || 'https://via.placeholder.com/50'}
                            alt={product?.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h3 className="font-bold">{product?.name}</h3>
                            <p className="text-gray-600">${product?.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Decreasing quantity for product:', item.productId);
                              updateCartQuantity(item.productId, -1);
                            }}
                            className="text-gray-700 hover:text-blue-600"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Increasing quantity for product:', item.productId);
                              updateCartQuantity(item.productId, 1);
                            }}
                            className="text-gray-700 hover:text-blue-600"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('Removing product from cart:', item.productId);
                              removeFromCart(item.productId);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Initiating checkout');
                        handleCheckout();
                      }}
                      style={{
                        background: design.primaryColor,
                        borderRadius: design.borderRadius,
                      }}
                      className="text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </SafeMotion>
          </div>
        )}

        {showAddress && (
          <div className="modal-overlay">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-white rounded-lg p-6 hover-effect max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold gradient-text">My Address</h2>
                <button
                  onClick={() => {
                    console.log('Closing address form');
                    setShowAddress(false);
                  }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {user?.address ? (
                <div className="mb-6">
                  <p><strong>Full Name:</strong> {user.address.fullName}</p>
                  <p><strong>Phone:</strong> {user.address.phone}</p>
                  <p><strong>Address:</strong> {user.address.address}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                  <p><strong>ZIP:</strong> {user.address.zip}</p>
                  <p><strong>Country:</strong> {user.address.country}</p>
                </div>
              ) : (
                <p className="text-gray-500 mb-6">No address saved yet.</p>
              )}
              <form onSubmit={saveAddress}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="full-name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    defaultValue={user?.address?.fullName || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={user?.address?.phone || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    defaultValue={user?.address?.address || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    defaultValue={user?.address?.city || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="zip">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    defaultValue={user?.address?.zip || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    defaultValue={user?.address?.country || ''}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                  className="w-full text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Address
                </button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </SafeMotion>
          </div>
        )}

        {showAdmin && isAdmin && (
          <div className="modal-overlay">
            <SafeMotion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-white rounded-lg p-6 hover-effect max-w-3xl w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold gradient-text">Admin Dashboard</h2>
                <button
                  onClick={() => {
                    console.log('Closing admin dashboard');
                    setShowAdmin(false);
                  }}
                  className="text-gray-700 hover:text-red-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                <form onSubmit={addNewProduct}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="new-product-name">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="new-product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="new-product-description">
                      Description
                    </label>
                    <textarea
                      id="new-product-description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="new-product-price">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="new-product-price"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="new-product-image">
                      Image
                    </label>
                    <input
                      type="file"
                      id="new-product-image"
                      accept="image/*"
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                      required
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                    className="w-full text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add Product
                  </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-bold">{product.name}</h4>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Deleting product:', product.id);
                          deleteProduct(product.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-500">No orders found.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p><strong>Order ID:</strong> {order._id}</p>
                          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                          <p><strong>Status:</strong> {order.status}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log('Canceling order:', order._id);
                            cancelOrder(order._id);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancel
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </SafeMotion>
          </div>
        )}
      </main>

      <footer
        style={{ background: design.primaryColor }}
        className="text-white py-6"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4">{shopName}</h3>
              <p>{shopDescription}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p>Email: {email}</p>
              {whatsapp && (
                <p>
                  WhatsApp:{' '}
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-200"
                  >
                    {whatsapp}
                  </a>
                </p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-200">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <p className="text-center mt-6 text-sm">
            &copy; {new Date().getFullYear()} {shopName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TemplateEcommerce1;