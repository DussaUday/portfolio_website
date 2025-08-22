import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// This API_BASE_URL is a fallback for development. It will be overridden by the script tag in the deployed HTML.
const API_BASE_URL = (typeof window !== 'undefined' && window.APP_CONFIG?.apiBaseUrl) || 'https://dev-server-tvbl.onrender.com';

function TemplateEcommerce2({ components, ecommerceId }) {
  const {
    shopName = 'ShopEase',
    shopDescription = 'Your one-stop shop for all your needs.',
    email = 'contact@shopease.com',
    whatsapp = '',
    products = [],
    design = {
      primaryColor: '#D946EF', // Fuchsia
      secondaryColor: '#FBBF24', // Amber
      backgroundColor: '#1F1F1F', // Dark Gray
      textColor: '#E5E7EB', // Light Gray
      fontFamily: "'Inter', sans-serif",
      borderRadius: '0.75rem',
      animationType: 'bounce',
      sectionPadding: '2.5rem',
      cardShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      hoverEffect: 'glow',
    },
  } = components;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState({ items: [] });
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' });
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token || !ecommerceId) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        setCart({ items: [] });
        setIsLoading(false);
        return;
      }

      const userRes = await axios.get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data.user);
      setIsLoggedIn(true);
      setIsAdmin(userRes.data.user.isAdmin || false);

      const cartRes = await axios.get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cartRes.data);

      if (userRes.data.user.isAdmin) {
        const ordersRes = await axios.get(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch user data or cart:', err);
      setError(err.response?.data?.error || 'Failed to fetch user data. Please try again.');
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [ecommerceId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setCart({ items: [] });
    setOrders([]);
    setActivePage('home');
    closeModals();
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setError(null);
  };

  const showPage = (pageName) => {
    closeModals();
    setIsMenuOpen(false);
    setActivePage(pageName);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#login-email').value;
    const password = e.target.querySelector('#login-password').value;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setError(null);
      await fetchUserData();
      showPage('home');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
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
      localStorage.setItem('token', res.data.token);
      setError(null);
      await fetchUserData();
      showPage('home');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      setError('Please log in to add products to your cart.');
      setShowLogin(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.response?.data?.error || 'Failed to add to cart.');
    }
  };

  const updateCartQuantity = async (productId, change) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart`,
        { productId, quantityChange: change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Update cart error:', err);
      setError(err.response?.data?.error || 'Failed to update cart.');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
      setError(null);
    } catch (err) {
      console.error('Remove from cart error:', err);
      setError(err.response?.data?.error || 'Failed to remove from cart.');
    }
  };

  const handleCheckout = async () => {
    if (!user?.address) {
      showPage('address');
      setError('Please add an address before checkout.');
      return;
    }
    if (cart.items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/order`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart({ items: [] });
      showPage('home');
      setError(null);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.error || 'Failed to place order.');
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    const addressData = {
      fullName: e.target.querySelector('#full-name').value,
      phone: e.target.querySelector('#phone').value,
      address: e.target.querySelector('#address').value,
      city: e.target.querySelector('#city').value,
      zip: e.target.querySelector('#zip').value,
      country: e.target.querySelector('#country').value,
    };
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/address`,
        addressData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      showPage('address');
      setError(null);
    } catch (err) {
      console.error('Save address error:', err);
      setError(err.response?.data?.error || 'Failed to save address.');
    }
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required.');
      if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
        throw new Error('All product fields are required.');
      }
      await axios.post(
        `${API_BASE_URL}/api/ecommerce/${ecommerceId}/add-product`,
        { ...newProduct, price: parseFloat(newProduct.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProduct({ name: '', description: '', price: 0, image: '' });
      setError(null);
      alert('Product added successfully!');
      fetchUserData();
    } catch (err) {
      console.error('Add product error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to add product.');
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/api/ecommerce/${ecommerceId}/product/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setError(null);
        alert('Product deleted successfully!');
        fetchUserData();
      } catch (err) {
        console.error('Delete product error:', err);
        setError(err.response?.data?.error || 'Failed to delete product.');
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDynamicStyles = () => {
    let hoverStyles = '';
    if (design.hoverEffect === 'glow') {
      hoverStyles = 'transform: scale(1.02); box-shadow: 0 0 20px rgba(217, 70, 239, 0.5);';
    }

    return `
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes slideIn { 0% { transform: translateX(50px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
      .custom-animation { animation: ${design.animationType} 2s ease-in-out infinite; }
      .hover-effect { transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .hover-effect:hover { ${hoverStyles} }
      .gradient-text {
        background: linear-gradient(45deg, ${design.primaryColor}, ${design.secondaryColor});
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient-shift 4s linear infinite;
      }
      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
      }
      .sidebar.open {
        transform: translateX(0);
      }
      @media (min-width: 768px) {
        .sidebar {
          transform: translateX(0);
          position: relative;
        }
        .main-content {
          margin-left: 16rem;
        }
      }
    `;
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-gray-800 rounded-lg p-6 hover-effect"
            >
              <h2 className="text-2xl font-bold mb-4 gradient-text">{shopName}</h2>
              <p className="text-gray-300 mb-4">{shopDescription}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              id="items"
              style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
              className="bg-gray-800 rounded-lg p-6 mt-6 hover-effect"
            >
              <h2 className="text-2xl font-bold gradient-text mb-6">Our Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length === 0 ? (
                  <p className="text-gray-400 col-span-full text-center py-10">No products found</p>
                ) : (
                  products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.03 }}
                      style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
                      className="bg-gray-700 rounded-lg overflow-hidden hover-effect"
                    >
                      <img
                        src={product.image || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 gradient-text">{product.name}</h3>
                        <p className="text-gray-300 mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          {isLoggedIn && (
                            <button
                              onClick={() => addToCart(product.id)}
                              style={{
                                background: design.primaryColor,
                                borderRadius: design.borderRadius,
                              }}
                              className="text-white px-3 py-1 rounded-lg hover:bg-fuchsia-600 transition"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        );
      case 'items':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-gray-800 rounded-lg p-6 hover-effect"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Our Products</h2>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: design.borderRadius }}
                className="px-4 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-400 col-span-full text-center py-10">No products found</p>
              ) : (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
                    className="bg-gray-700 rounded-lg overflow-hidden hover-effect"
                  >
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 gradient-text">{product.name}</h3>
                      <p className="text-gray-300 mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                        {isLoggedIn && (
                          <button
                            onClick={() => addToCart(product.id)}
                            style={{
                              background: design.primaryColor,
                              borderRadius: design.borderRadius,
                            }}
                            className="text-white px-3 py-1 rounded-lg hover:bg-fuchsia-600 transition"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        );
      case 'cart':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-gray-800 rounded-lg p-6 hover-effect"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Your Cart</h2>
            {cart.items.length === 0 ? (
              <div className="text-center py-10">
                <i className="fas fa-shopping-cart text-5xl text-gray-500 mb-4"></i>
                <p className="text-gray-400 text-lg">Your cart is empty</p>
                <button
                  onClick={() => showPage('items')}
                  style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                  className="mt-4 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition"
                >
                  Browse Items
                </button>
              </div>
            ) : (
              <div>
                {cart.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center justify-between p-4 border-b border-gray-600">
                      <div className="flex items-center">
                        <img
                          src={product.image || 'https://via.placeholder.com/50'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-gray-200">{product.name}</h3>
                          <p className="text-gray-400">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateCartQuantity(item.productId, -1)}
                          className="text-gray-400 hover:text-fuchsia-500"
                          disabled={item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="text-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, 1)}
                          className="text-gray-400 hover:text-fuchsia-500"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">Total:</h3>
                  <p className="text-xl font-bold text-gray-200">
                    ${cart.items.reduce((total, item) => {
                      const product = products.find((p) => p.id === item.productId);
                      return total + (product ? product.price * item.quantity : 0);
                    }, 0).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  style={{ background: design.secondaryColor, borderRadius: design.borderRadius }}
                  className="w-full mt-4 text-white py-3 px-4 rounded-lg hover:bg-amber-500 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </motion.div>
        );
      case 'address':
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-gray-800 rounded-lg p-6 hover-effect max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">My Address</h2>
            {user?.address ? (
              <div className="mb-6 text-gray-300">
                <p><strong>Full Name:</strong> {user.address.fullName}</p>
                <p><strong>Phone:</strong> {user.address.phone}</p>
                <p><strong>Address:</strong> {user.address.address}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>ZIP:</strong> {user.address.zip}</p>
                <p><strong>Country:</strong> {user.address.country}</p>
              </div>
            ) : (
              <p className="text-gray-400 mb-6">No address saved yet.</p>
            )}
            <form onSubmit={saveAddress}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  defaultValue={user?.address?.fullName || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue={user?.address?.phone || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  defaultValue={user?.address?.address || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  defaultValue={user?.address?.city || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  defaultValue={user?.address?.zip || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Country</label>
                <input
                  type="text"
                  id="country"
                  defaultValue={user?.address?.country || ''}
                  required
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                className="w-full text-white py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition"
              >
                Save Address
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </motion.div>
        );
      case 'admin':
        if (!isAdmin) {
          return <p className="text-center text-red-500 py-10">Access Denied. Admins only.</p>;
        }
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
            className="bg-gray-800 rounded-lg p-6 hover-effect"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Admin Dashboard</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Add New Product</h3>
              <form onSubmit={addNewProduct}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                    rows="4"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: design.primaryColor, borderRadius: design.borderRadius }}
                  className="w-full text-white py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition"
                >
                  Add Product
                </button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Manage Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.length === 0 ? (
                  <p className="text-gray-400 col-span-full text-center py-10">No products found.</p>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-bold text-gray-200">{product.name}</h4>
                        <p className="text-gray-400">${product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Orders</h3>
              {orders.length === 0 ? (
                <p className="text-gray-400">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                        <p><strong>Items:</strong> {order.items.map((i) => `${i.name} (${i.quantity})`).join(', ')}</p>
                      </div>
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <i className="fas fa-ban"></i> Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-fuchsia-500 mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <p className="mt-4 text-gray-400">Loading store...</p>
        </div>
      </div>
    );
  }

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
        style={{ background: '#2D2D2D', boxShadow: design.cardShadow }}
        className="shadow-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-4 text-gray-300 hover:text-fuchsia-500 md:hidden"
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
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  style={{ color: design.textColor }}
                  className="hidden md:inline-block text-gray-300 hover:text-fuchsia-500"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
                <button
                  onClick={() => showPage('cart')}
                  className="relative text-gray-300 hover:text-fuchsia-500"
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
                  closeModals();
                  setShowLogin(true);
                }}
                style={{ color: design.textColor }}
                className="text-gray-300 hover:text-fuchsia-500"
              >
                <i className="fas fa-user"></i> Login
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        <div
          className={`sidebar fixed md:relative h-full z-40 bg-gray-800 shadow-md w-64 ${isMenuOpen ? 'open' : ''}`}
        >
          <div className="p-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => showPage('home')}
                    style={{ borderRadius: design.borderRadius }}
                    className={`w-full text-left px-4 py-2 rounded-lg ${activePage === 'home' ? 'bg-fuchsia-900 text-fuchsia-300 font-medium' : 'hover:bg-gray-700 text-gray-300'} hover-effect`}
                  >
                    <i className="fas fa-home mr-2"></i> Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => showPage('items')}
                    style={{ borderRadius: design.borderRadius }}
                    className={`w-full text-left px-4 py-2 rounded-lg ${activePage === 'items' ? 'bg-fuchsia-900 text-fuchsia-300 font-medium' : 'hover:bg-gray-700 text-gray-300'} hover-effect`}
                  >
                    <i className="fas fa-box-open mr-2"></i> Items
                  </button>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      <button
                        onClick={() => showPage('cart')}
                        style={{ borderRadius: design.borderRadius }}
                        className={`w-full text-left px-4 py-2 rounded-lg ${activePage === 'cart' ? 'bg-fuchsia-900 text-fuchsia-300 font-medium' : 'hover:bg-gray-700 text-gray-300'} hover-effect`}
                      >
                        <i className="fas fa-shopping-cart mr-2"></i> Cart
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => showPage('address')}
                        style={{ borderRadius: design.borderRadius }}
                        className={`w-full text-left px-4 py-2 rounded-lg ${activePage === 'address' ? 'bg-fuchsia-900 text-fuchsia-300 font-medium' : 'hover:bg-gray-700 text-gray-300'} hover-effect`}
                      >
                        <i className="fas fa-address-book mr-2"></i> My Address
                      </button>
                    </li>
                  </>
                )}
                {isAdmin && (
                  <li>
                    <button
                      onClick={() => showPage('admin')}
                      style={{ borderRadius: design.borderRadius }}
                      className={`w-full text-left px-4 py-2 rounded-lg ${activePage === 'admin' ? 'bg-fuchsia-900 text-fuchsia-300 font-medium' : 'hover:bg-gray-700 text-gray-300'} hover-effect`}
                    >
                      <i className="fas fa-user-shield mr-2"></i> Admin Dashboard
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <main className="flex-1 p-4 main-content">
          <AnimatePresence mode="wait">
            {showLogin && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
                className="bg-gray-800 rounded-lg p-6 hover-effect max-w-md mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input type="email" id="login-email" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input type="password" id="login-password" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" />
                  </div>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <button type="submit" style={{ background: design.primaryColor, borderRadius: design.borderRadius }} className="w-full text-white py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition">Login</button>
                </form>
                <p className="mt-4 text-center text-gray-300">Don't have an account? <button onClick={() => { setShowLogin(false); setShowSignup(true); }} className="text-fuchsia-500 hover:underline">Sign Up</button></p>
              </motion.div>
            )}
            {showSignup && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                style={{ boxShadow: design.cardShadow, borderRadius: design.borderRadius }}
                className="bg-gray-800 rounded-lg p-6 hover-effect max-w-md mx-auto"
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">Sign Up</h2>
                <form onSubmit={handleSignup}>
                  <div className="mb-4"><label className="block text-gray-300 mb-2">Name</label><input type="text" id="signup-name" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" /></div>
                  <div className="mb-4"><label className="block text-gray-300 mb-2">Email</label><input type="email" id="signup-email" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" /></div>
                  <div className="mb-4"><label className="block text-gray-300 mb-2">Password</label><input type="password" id="signup-password" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" /></div>
                  <div className="mb-4"><label className="block text-gray-300 mb-2">Phone</label><input type="tel" id="signup-phone" required className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" /></div>
                  <div className="mb-4"><label className="block text-gray-300 mb-2">WhatsApp</label><input type="tel" id="signup-whatsapp" className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-gray-300 rounded-lg" /></div>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <button type="submit" style={{ background: design.primaryColor, borderRadius: design.borderRadius }} className="w-full text-white py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition">Sign Up</button>
                </form>
                <p className="mt-4 text-center text-gray-300">Already have an account? <button onClick={() => { setShowSignup(false); setShowLogin(true); }} className="text-fuchsia-500 hover:underline">Login</button></p>
              </motion.div>
            )}
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {!showLogin && !showSignup && renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

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
                <a href="#" className="hover:text-gray-200"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-gray-200"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-gray-200"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <p className="text-center mt-6">&copy; {new Date().getFullYear()} {shopName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default TemplateEcommerce2;