import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { renderToString } from 'react-dom/server';
import TemplateEcommerce1 from '../ECommerceTemplates/TemplateEcommerce1';
import TemplateEcommerce2 from '../ECommerceTemplates/TemplateEcommerce2';

function TemplateEditorEcommerce() {
  const { templateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const controls = useAnimation();
  const buttonControls = useAnimation();
  const [ecommerceId, setEcommerceId] = useState(null);
  const [repoUrl, setRepoUrl] = useState(null);
  const [components, setComponents] = useState({
    shopName: 'ShopEase',
    shopDescription: 'Your one-stop shop for all your needs.',
    email: 'contact@shopease.com',
    whatsapp: '',
    products: [
      { id: '1', name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 99.99, image: 'https://via.placeholder.com/150' },
          ],
    design: {
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
  });
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [previewMode, setPreviewMode] = useState(true);
  const [deployedUrl, setDeployedUrl] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState(null);
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'drc8bufjn';
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Portfolio';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev-server-tvbl.onrender.com';

  const templateComponents = {
    templateEcommerce1: TemplateEcommerce1,
    templateEcommerce2: TemplateEcommerce2,
  };

  const SelectedTemplate = templateComponents[templateId] || TemplateEcommerce1;

  useEffect(() => {
    if (location.state?.ecommerce) {
      const { components: e_components, _id, githubPagesUrl, githubRepo } = location.state.ecommerce;
      const parsedComponents = typeof e_components === 'string' ? JSON.parse(e_components) : e_components;
      setComponents(parsedComponents);
      setEcommerceId(_id);
      setDeployedUrl(githubPagesUrl);
      setRepoUrl(githubRepo);
      setProductImages(parsedComponents.products.map(() => null));
    }
  }, [location.state]);

  const validatePhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    return phoneRegex.test(phone) ? phone : '';
  };

  const handleImageUpload = async (file, type, index = null) => {
    if (!file) return null;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'ecommerce_products');
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      if (type.startsWith('product')) {
        setComponents((prev) => {
          const newProducts = [...prev.products];
          newProducts[index] = { ...newProducts[index], image: response.data.secure_url };
          return { ...prev, products: newProducts };
        });
        setProductImages((prev) => {
          const newImages = [...prev];
          newImages[index] = response.data.secure_url;
          return newImages;
        });
        return response.data.secure_url;
      }
      return response.data.secure_url;
    } catch (error) {
      setUploadError(`Error uploading ${type}: ${error.response?.data?.error?.message || error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const addProduct = () => {
    setComponents((prev) => ({
      ...prev,
      products: [...prev.products, { id: Date.now().toString(), name: '', description: '', price: 0, image: null }],
    }));
    setProductImages((prev) => [...prev, null]);
  };

  const removeLastProduct = () => {
    setComponents((prev) => ({
      ...prev,
      products: prev.products.slice(0, -1),
    }));
    setProductImages((prev) => prev.slice(0, -1));
  };

  const updateProduct = (index, field, value) => {
    setComponents((prev) => {
      const newProducts = [...prev.products];
      newProducts[index] = { ...newProducts[index], [field]: field === 'price' ? parseFloat(value) || 0 : value };
      return { ...prev, products: newProducts };
    });
  };

  const copyToClipboard = () => {
    if (!deployedUrl) {
      alert('No URL to copy.');
      return;
    }
    navigator.clipboard.writeText(deployedUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link.');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError(null);
    setIsDeploying(true);
    setDeploySuccess(false);
    try {
      await buttonControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      });
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required. Please log in.');
      if (!components.shopName || !components.shopDescription || !components.email || !components.email.includes('@') || !components.whatsapp) {
        throw new Error('Shop Name, Description, Email, and WhatsApp are required.');
      }

      const validatedComponents = {
        ...components,
        whatsapp: validatePhoneNumber(components.whatsapp),
      };
      if (!validatedComponents.whatsapp) {
        throw new Error('Invalid WhatsApp phone number. Please enter a valid phone number (e.g., +1234567890).');
      }

      const uploadedProducts = await Promise.all(
      validatedComponents.products.map(async (product, index) => {
        let imageUrl = product.image;
        const fileInput = document.getElementById(`product-image-${product.id}`);
        if (fileInput && fileInput.files[0]) {
          imageUrl = await handleImageUpload(fileInput.files[0], `product-${index}`, index);
        }
        return { ...product, image: imageUrl }; // Fixed this line
      })
    );
      const finalComponents = {
        ...validatedComponents,
        products: uploadedProducts,
      };
      const productListHtml = finalComponents.products.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-3">${product.description}</p>
            <div class="flex justify-between items-center">
              <span class="font-bold text-lg">$${product.price.toFixed(2)}</span>
              <button class="add-to-cart bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');
      const adminProductRows = finalComponents.products.map(product => `
        <tr class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b">${product.name}</td>
          <td class="py-2 px-4 border-b">${product.description}</td>
          <td class="py-2 px-4 border-b">$${product.price.toFixed(2)}</td>
          <td class="py-2 px-4 border-b">
            <button class="delete-product text-red-500 hover:text-red-700" data-id="${product.id}">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${finalComponents.shopName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <style>
            .gradient-text {
              background-image: linear-gradient(to right, ${finalComponents.design.primaryColor}, ${finalComponents.design.secondaryColor});
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          </style>
        </head>
        <body class="bg-gray-100 font-sans">
          <div class="min-h-screen flex flex-col">
            <div id="auth-modals">
              <div id="login-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div class="bg-white p-8 rounded-lg shadow-lg w-96">
                  <h2 class="text-2xl font-bold mb-6 text-center gradient-text">Login</h2>
                  <form id="login-form">
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2" for="login-email">Email</label>
                      <input type="email" id="login-email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 mb-2" for="login-password">Password</label>
                      <input type="password" id="login-password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Login</button>
                  </form>
                  <p class="mt-4 text-center text-gray-600">
                    Don't have an account?
                    <button id="show-signup" class="text-blue-600 hover:underline">Sign up</button>
                  </p>
                </div>
              </div>

              <div id="signup-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div class="bg-white p-8 rounded-lg shadow-lg w-96">
                  <h2 class="text-2xl font-bold mb-6 text-center gradient-text">Sign Up</h2>
                  <form id="signup-form">
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2" for="signup-name">Full Name</label>
                      <input type="text" id="signup-name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2" for="signup-email">Email</label>
                      <input type="email" id="signup-email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2" for="signup-password">Password</label>
                      <input type="password" id="signup-password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 mb-2" for="signup-phone">Phone Number</label>
                      <input type="tel" id="signup-phone" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 mb-2" for="signup-whatsapp">WhatsApp Number</label>
                      <input type="tel" id="signup-whatsapp" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                  </form>
                  <p class="mt-4 text-center text-gray-600">
                    Already have an account?
                    <button id="show-login" class="text-blue-600 hover:underline">Login</button>
                  </p>
                </div>
              </div>
            </div>

            <header class="bg-white shadow-md">
              <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="flex items-center">
                  <button id="menu-toggle" class="mr-4 text-gray-700 hover:text-blue-600 md:hidden">
                    <i class="fas fa-bars text-xl"></i>
                  </button>
                  <h1 class="text-2xl font-bold gradient-text">${finalComponents.shopName}</h1>
                </div>
                <div class="flex items-center space-x-4">
                  <button id="auth-btn" class="text-gray-700 hover:text-blue-600">
                    <i class="fas fa-user"></i> Login
                  </button>
                  <button id="cart-btn" class="relative text-gray-700 hover:text-blue-600 hidden">
                    <i class="fas fa-shopping-cart text-xl"></i>
                    <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                  </button>
                  <button id="logout-btn" class="text-gray-700 hover:text-blue-600 hidden">
                    <i class="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            </header>

            <div class="flex flex-1">
              <aside id="sidebar" class="bg-white shadow-md w-64 fixed h-full z-40 -translate-x-full md:translate-x-0 transition-transform duration-300">
                <div class="p-4">
                  <nav>
                    <ul class="space-y-2">
                      <li>
                        <button id="home-btn" class="w-full text-left px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">
                          <i class="fas fa-home mr-2"></i> Home
                        </button>
                      </li>
                      <li>
                        <button id="items-btn" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                          <i class="fas fa-box-open mr-2"></i> Items
                        </button>
                      </li>
                      <li>
                        <button id="cart-nav-btn" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                          <i class="fas fa-shopping-cart mr-2"></i> Cart
                        </button>
                      </li>
                      <li>
                        <button id="address-btn" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                          <i class="fas fa-address-book mr-2"></i> My Address
                        </button>
                      </li>
                      <li id="admin-dashboard-btn" class="hidden">
                        <button id="admin-btn" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                          <i class="fas fa-user-shield mr-2"></i> Admin Dashboard
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>

              <main class="flex-1 p-4 md:ml-64">
                <div id="home-page">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-4 gradient-text">Welcome to ${finalComponents.shopName}</h2>
                    <p class="text-gray-700 mb-4">${finalComponents.shopDescription}</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 class="font-bold text-blue-700 mb-2">Wide Selection</h3>
                        <p class="text-gray-600">Choose from thousands of products across various categories.</p>
                      </div>
                      <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 class="font-bold text-green-700 mb-2">Fast Delivery</h3>
                        <p class="text-gray-600">Get your orders delivered to your doorstep in no time.</p>
                      </div>
                      <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 class="font-bold text-purple-700 mb-2">Secure Payments</h3>
                        <p class="text-gray-600">Shop with confidence using our secure payment methods.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="items-page" class="hidden">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex justify-between items-center mb-6">
                      <h2 class="text-2xl font-bold gradient-text">Our Products</h2>
                      <div class="relative">
                        <input type="text" id="search-items" placeholder="Search products..." class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                      </div>
                    </div>
                    <div id="items-container" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      ${productListHtml}
                    </div>
                  </div>
                </div>

                <div id="cart-page" class="hidden">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-6 gradient-text">Your Cart</h2>
                    <div id="cart-container">
                      <div id="empty-cart" class="text-center py-10">
                        <i class="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500 text-lg">Your cart is empty</p>
                        <button id="browse-items" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Browse Items</button>
                      </div>
                      <div id="cart-items" class="hidden">
                        <div class="border-b pb-4 mb-4">
                          <div id="cart-items-list" class="space-y-4">
                            </div>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                          <h3 class="text-lg font-semibold">Total:</h3>
                          <p id="cart-total" class="text-xl font-bold">$0.00</p>
                        </div>
                        <button id="checkout-btn" class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition">Proceed to Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="address-page" class="hidden">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-6 gradient-text">My Address</h2>
                    <div id="address-container">
                      <div id="no-address" class="text-center py-10">
                        <i class="fas fa-map-marker-alt text-5xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500 text-lg">You haven't added any address yet</p>
                        <button id="add-address-btn" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Address</button>
                      </div>
                      <div id="address-form-container" class="hidden">
                        <form id="address-form" class="space-y-4">
                          <div>
                            <label class="block text-gray-700 mb-2" for="full-name">Full Name</label>
                            <input type="text" id="full-name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                          </div>
                          <div>
                            <label class="block text-gray-700 mb-2" for="phone">Phone Number</label>
                            <input type="tel" id="phone" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                          </div>
                          <div>
                            <label class="block text-gray-700 mb-2" for="address">Full Address</label>
                            <textarea id="address" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                          </div>
                          <div class="grid grid-cols-2 gap-4">
                            <div>
                              <label class="block text-gray-700 mb-2" for="city">City</label>
                              <input type="text" id="city" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                            <div>
                              <label class="block text-gray-700 mb-2" for="zip">ZIP Code</label>
                              <input type="text" id="zip" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                          </div>
                          <div>
                            <label class="block text-gray-700 mb-2" for="country">Country</label>
                            <input type="text" id="country" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                          </div>
                          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Save Address</button>
                        </form>
                      </div>
                      <div id="saved-address" class="hidden mt-6">
                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h3 class="font-bold text-lg mb-2">Saved Address</h3>
                          <div id="address-details" class="text-gray-700 space-y-1">
                            </div>
                          <button id="edit-address" class="mt-4 text-blue-600 hover:underline">Edit Address</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="admin-dashboard" class="hidden">
                  <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-2xl font-bold mb-6 gradient-text">Admin Dashboard</h2>
                    
                    <div class="mb-8">
                      <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Manage Products</h3>
                        <button id="add-product-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Product</button>
                      </div>
                      
                      <div id="add-product-form" class="bg-gray-50 p-4 rounded-lg mb-6 hidden">
                        <form id="new-product-form" class="space-y-4">
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label class="block text-gray-700 mb-2" for="product-name">Product Name</label>
                              <input type="text" id="product-name" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                            <div>
                              <label class="block text-gray-700 mb-2" for="product-price">Price ($)</label>
                              <input type="number" id="product-price" min="0" step="0.01" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                          </div>
                          <div>
                            <label class="block text-gray-700 mb-2" for="product-description">Description</label>
                            <textarea id="product-description" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                          </div>
                          <div>
                            <label class="block text-gray-700 mb-2" for="product-image">Image URL</label>
                            <input type="text" id="product-image" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                          </div>
                          <div class="flex space-x-4">
                            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Add Product</button>
                            <button type="button" id="cancel-add-product" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Cancel</button>
                          </div>
                        </form>
                      </div>
                      
                      <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr class="bg-gray-100">
                              <th class="py-2 px-4 border-b text-left">Product</th>
                              <th class="py-2 px-4 border-b text-left">Description</th>
                              <th class="py-2 px-4 border-b text-left">Price</th>
                              <th class="py-2 px-4 border-b text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody id="admin-products-list">
                            ${adminProductRows}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h3 class="text-xl font-semibold mb-4">Customer Orders</h3>
                      <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr class="bg-gray-100">
                              <th class="py-2 px-4 border-b text-left">Order ID</th>
                              <th class="py-2 px-4 border-b text-left">Customer</th>
                              <th class="py-2 px-4 border-b text-left">Items</th>
                              <th class="py-2 px-4 border-b text-left">Total</th>
                              <th class="py-2 px-4 border-b text-left">Phone</th>
                              <th class="py-2 px-4 border-b text-left">Address</th>
                            </tr>
                          </thead>
                          <tbody id="orders-list">
                            </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <script>
            // API Configuration
            const API_BASE_URL = '${API_BASE_URL}';
            const ecommerceId = '${ecommerceId}';
            // DOM Elements
            const authBtn = document.getElementById('auth-btn');
            const logoutBtn = document.getElementById('logout-btn');
            const cartBtn = document.getElementById('cart-btn');
            const cartCount = document.getElementById('cart-count');
            const menuToggle = document.getElementById('menu-toggle');
            const sidebar = document.getElementById('sidebar');
            // Modal Elements
            const loginModal = document.getElementById('login-modal');
            const signupModal = document.getElementById('signup-modal');
            const showLoginBtn = document.getElementById('show-login');
            const showSignupBtn = document.getElementById('show-signup');
            // Form Elements
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            // Page Elements
            const homePage = document.getElementById('home-page');
            const itemsPage = document.getElementById('items-page');
            const cartPage = document.getElementById('cart-page');
            const addressPage = document.getElementById('address-page');
            const adminDashboard = document.getElementById('admin-dashboard');
            // Navigation Buttons
            const homeBtn = document.getElementById('home-btn');
            const itemsBtn = document.getElementById('items-btn');
            const cartNavBtn = document.getElementById('cart-nav-btn');
            const addressBtn = document.getElementById('address-btn');
            const adminBtn = document.getElementById('admin-btn');
            const adminDashboardBtn = document.getElementById('admin-dashboard-btn');
            const browseItemsBtn = document.getElementById('browse-items');
            const addAddressBtn = document.getElementById('add-address-btn');
            // Items Page Elements
            const itemsContainer = document.getElementById('items-container');
            const searchItems = document.getElementById('search-items');
            // Cart Page Elements
            const emptyCart = document.getElementById('empty-cart');
            const cartItems = document.getElementById('cart-items');
            const cartItemsList = document.getElementById('cart-items-list');
            const cartTotal = document.getElementById('cart-total');
            const checkoutBtn = document.getElementById('checkout-btn');
            // Address Page Elements
            const noAddress = document.getElementById('no-address');
            const addressFormContainer = document.getElementById('address-form-container');
            const addressForm = document.getElementById('address-form');
            const savedAddress = document.getElementById('saved-address');
            const addressDetails = document.getElementById('address-details');
            const editAddressBtn = document.getElementById('edit-address');
            // Admin Dashboard Elements
            const addProductBtn = document.getElementById('add-product-btn');
            const addProductForm = document.getElementById('add-product-form');
            const newProductForm = document.getElementById('new-product-form');
            const cancelAddProduct = document.getElementById('cancel-add-product');
            const adminProductsList = document.getElementById('admin-products-list');
            const ordersList = document.getElementById('orders-list');
            // Data
            let products = ${JSON.stringify(finalComponents.products)};
            let currentUser = null;
            // Event Listeners
            document.addEventListener('DOMContentLoaded', initApp);
            authBtn.addEventListener('click', showAuthModal);
            logoutBtn.addEventListener('click', logout);
            menuToggle.addEventListener('click', toggleSidebar);
            // Modal Events
            showLoginBtn.addEventListener('click', () => {
              signupModal.classList.add('hidden');
              loginModal.classList.remove('hidden');
            });
            showSignupBtn.addEventListener('click', () => {
              loginModal.classList.add('hidden');
              signupModal.classList.remove('hidden');
            });
            // Form Events
            loginForm.addEventListener('submit', handleLogin);
            signupForm.addEventListener('submit', handleSignup);
            // Navigation Events
            homeBtn.addEventListener('click', () => showPage('home'));
            itemsBtn.addEventListener('click', () => showPage('items'));
            cartNavBtn.addEventListener('click', () => showPage('cart'));
            cartBtn.addEventListener('click', () => showPage('cart'));
            addressBtn.addEventListener('click', () => showPage('address'));
            adminBtn?.addEventListener('click', () => showPage('admin'));
            browseItemsBtn.addEventListener('click', () => showPage('items'));
            addAddressBtn?.addEventListener('click', showAddressForm);
            // Items Events
            searchItems.addEventListener('input', filterItems);
            // Cart Events
            checkoutBtn.addEventListener('click', checkout);
            // Address Events
            addressForm.addEventListener('submit', saveAddress);
            editAddressBtn?.addEventListener('click', editAddress);
            // Admin Events
            addProductBtn?.addEventListener('click', () => addProductForm.classList.toggle('hidden'));
            cancelAddProduct?.addEventListener('click', () => addProductForm.classList.add('hidden'));
            newProductForm?.addEventListener('submit', addNewProduct);
            // Initialize Application
            async function initApp() {
                const token = localStorage.getItem('ecommerce_token');
                if (token) {
                    try {
                        const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/user\`, {
                            headers: { 'Authorization': \`Bearer \${token}\` },
                        });
                        const data = await response.json();
                        if (response.ok) {
                            currentUser = data.user;
                            localStorage.setItem('ecommerce_currentUser', JSON.stringify(currentUser));
                            localStorage.setItem('ecommerce_token', token);
                            updateAuthUI();
                            if (currentUser.isAdmin) {
                                renderAdminProducts();
                                renderOrders();
                            }
                        } else {
                            throw new Error(data.error);
                        }
                    } catch (error) {
                        console.error('Auto-login failed:', error);
                        logout(); // Clear invalid token
                    }
                }
                
                showPage('home');
                renderProducts();
                updateCartCount();
            }
            // Auth Functions
            function showAuthModal() {
                if (currentUser) return;
                loginModal.classList.remove('hidden');
            }
            async function handleLogin(e) {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/login\`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    currentUser = data.user;
                    localStorage.setItem('ecommerce_token', data.token);
                    localStorage.setItem('ecommerce_currentUser', JSON.stringify(currentUser));

                    loginModal.classList.add('hidden');
                    updateAuthUI();
                    if (currentUser.isAdmin) {
                        showPage('admin');
                        renderAdminProducts();
                        renderOrders();
                    } else {
                        showPage('home');
                    }
                } catch (error) {
                    alert(\`Login failed: \${error.message}\`);
                }
            }
            async function handleSignup(e) {
                e.preventDefault();
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const phoneNumber = document.getElementById('signup-phone').value;
                const whatsapp = document.getElementById('signup-whatsapp').value;
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/signup\`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, password, phoneNumber, whatsapp }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    currentUser = data.user;
                    localStorage.setItem('ecommerce_token', data.token);
                    localStorage.setItem('ecommerce_currentUser', JSON.stringify(currentUser));

                    signupModal.classList.add('hidden');
                    updateAuthUI();
                    showPage('home');
                } catch (error) {
                    alert(\`Sign up failed: \${error.message}\`);
                }
            }
            function logout() {
                currentUser = null;
                localStorage.removeItem('ecommerce_token');
                localStorage.removeItem('ecommerce_currentUser');
                localStorage.removeItem('ecommerce_cart');
                updateAuthUI();
                showPage('home');
            }
            function updateAuthUI() {
                const token = localStorage.getItem('ecommerce_token');
                if (token && currentUser) {
                    authBtn.classList.add('hidden');
                    logoutBtn.classList.remove('hidden');
                    cartBtn.classList.remove('hidden');
                    addressBtn.classList.remove('hidden');
                    
                    if (currentUser.isAdmin) {
                        adminDashboardBtn.classList.remove('hidden');
                    } else {
                        adminDashboardBtn.classList.add('hidden');
                    }
                } else {
                    authBtn.classList.remove('hidden');
                    logoutBtn.classList.add('hidden');
                    cartBtn.classList.add('hidden');
                    adminDashboardBtn.classList.add('hidden');
                    addressBtn.classList.add('hidden');
                }
                updateCartCount();
            }
            // Navigation Functions
            function showPage(page) {
              const pages = [homePage, itemsPage, cartPage, addressPage, adminDashboard];
              pages.forEach(p => p.classList.add('hidden'));

              document.querySelectorAll('#sidebar button').forEach(btn => {
                btn.classList.remove('bg-blue-100', 'text-blue-700', 'font-medium');
                btn.classList.add('hover:bg-gray-100', 'text-gray-700');
              });
              switch (page) {
                case 'home':
                  homePage.classList.remove('hidden');
                  homeBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
                  homeBtn.classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
                  break;
                case 'items':
                  itemsPage.classList.remove('hidden');
                  itemsBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
                  itemsBtn.classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
                  break;
                case 'cart':
                  cartPage.classList.remove('hidden');
                  cartNavBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
                  cartNavBtn.classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
                  renderCart();
                  break;
                case 'address':
                  if (!currentUser) {
                    showAuthModal();
                    return;
                  }
                  addressPage.classList.remove('hidden');
                  addressBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
                  addressBtn.classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
                  renderAddress();
                  break;
                case 'admin':
                  if (!currentUser?.isAdmin) {
                    showPage('home');
                    return;
                  }
                  adminDashboard.classList.remove('hidden');
                  adminBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
                  adminBtn.classList.add('bg-blue-100', 'text-blue-700', 'font-medium');
                  break;
              }
            }
            function toggleSidebar() {
              sidebar.classList.toggle('-translate-x-full');
            }
            // Product Functions
            function renderProducts(filteredProducts = null) {
              itemsContainer.innerHTML = '';
              const productsToRender = filteredProducts || products;

              if (productsToRender.length === 0) {
                itemsContainer.innerHTML = '<p class="text-gray-500 col-span-4 text-center py-10">No products found</p>';
                return;
              }

              productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
                productCard.innerHTML = \`
                  <img src="\${product.image}" alt="\${product.name}" class="w-full h-48 object-cover">
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2">\${product.name}</h3>
                    <p class="text-gray-600 mb-3">\${product.description}</p>
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-lg">\$\${product.price.toFixed(2)}</span>
                      \${currentUser ? \`<button class="add-to-cart bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition" data-id="\${product.id}">Add to Cart</button>\` : ''}
                    </div>
                  </div>
                \`;
                itemsContainer.appendChild(productCard);
              });

              document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', async (e) => {
                  const productId = e.target.getAttribute('data-id');
                  await addToCart(productId);
                });
              });
            }
            function filterItems() {
              const searchTerm = searchItems.value.toLowerCase();
              const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
              );
              renderProducts(filteredProducts);
            }
            // Cart Functions
            async function addToCart(productId) {
                if (!currentUser) {
                    showAuthModal();
                    return;
                }
                const token = localStorage.getItem('ecommerce_token');
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/cart\`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': \`Bearer \${token}\`
                        },
                        body: JSON.stringify({ productId, quantity: 1 }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);
                    localStorage.setItem('ecommerce_cart', JSON.stringify(data.items));
                    updateCartCount();
                    const product = products.find(p => p.id === productId);
                    showToast(\`\${product.name} added to cart\`);
                } catch (error) {
                    showToast(\`Failed to add to cart: \${error.message}\`);
                }
            }
            async function updateCartCount() {
                const token = localStorage.getItem('ecommerce_token');
                if (!token) {
                    cartCount.classList.add('hidden');
                    return;
                }
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/cart\`, {
                        headers: { 'Authorization': \`Bearer \${token}\` },
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);
                    
                    const count = data.items.reduce((total, item) => total + item.quantity, 0);
                    localStorage.setItem('ecommerce_cart', JSON.stringify(data.items));

                    if (count > 0) {
                        cartCount.textContent = count;
                        cartCount.classList.remove('hidden');
                    } else {
                        cartCount.classList.add('hidden');
                    }
                } catch (error) {
                    console.error('Failed to fetch cart count:', error);
                    cartCount.classList.add('hidden');
                }
            }
            function renderCart() {
                const cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];
                if (cart.length === 0) {
                    emptyCart.classList.remove('hidden');
                    cartItems.classList.add('hidden');
                    return;
                }

                emptyCart.classList.add('hidden');
                cartItems.classList.remove('hidden');
                cartItemsList.innerHTML = '';
                let total = 0;

                cart.forEach(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return;

                    total += product.price * item.quantity;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'flex justify-between items-center border-b pb-4';
                    cartItem.innerHTML = \`
                        <div class="flex items-center">
                            <img src="\${product.image}" alt="\${product.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                            <div>
                                <h4 class="font-medium">\${product.name}</h4>
                                <p class="text-gray-600 text-sm">\$\${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button class="decrease-quantity text-gray-500 px-2 py-1 border rounded-l-lg" data-id="\${product.id}">-</button>
                            <span class="quantity px-3 py-1 border-t border-b">\${item.quantity}</span>
                            <button class="increase-quantity text-gray-500 px-2 py-1 border rounded-r-lg" data-id="\${product.id}">+</button>
                            <button class="remove-item text-red-500 ml-4" data-id="\${product.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    \`;
                    cartItemsList.appendChild(cartItem);
                });

                cartTotal.textContent = \`\$\${total.toFixed(2)}\`;

                document.querySelectorAll('.increase-quantity').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const productId = e.target.getAttribute('data-id');
                        await updateCartItemQuantity(productId, 1);
                    });
                });
                document.querySelectorAll('.decrease-quantity').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const productId = e.target.getAttribute('data-id');
                        await updateCartItemQuantity(productId, -1);
                    });
                });
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const productId = e.target.getAttribute('data-id');
                        await removeFromCart(productId);
                    });
                });
            }
            async function updateCartItemQuantity(productId, change) {
                const token = localStorage.getItem('ecommerce_token');
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/cart\`, {
                        method: 'PUT',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': \`Bearer \${token}\`
                        },
                        body: JSON.stringify({ productId, quantityChange: change }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);
                    localStorage.setItem('ecommerce_cart', JSON.stringify(data.items));
                    updateCartCount();
                    renderCart();
                } catch (error) {
                    showToast(\`Failed to update cart: \${error.message}\`);
                }
            }
            async function removeFromCart(productId) {
                const token = localStorage.getItem('ecommerce_token');
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/cart/\${productId}\`, {
                        method: 'DELETE',
                        headers: { 'Authorization': \`Bearer \${token}\` },
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    localStorage.setItem('ecommerce_cart', JSON.stringify(data.items));
                    updateCartCount();
                    renderCart();
                    showToast('Item removed from cart');
                } catch (error) {
                    showToast(\`Failed to remove from cart: \${error.message}\`);
                }
            }
            async function checkout() {
                if (!currentUser) {
                    showAuthModal();
                    return;
                }
                const token = localStorage.getItem('ecommerce_token');
                const cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];
                if (cart.length === 0) {
                    alert('Your cart is empty');
                    return;
                }
                if (!currentUser.address) {
                    alert('Please add your address before checkout');
                    showPage('address');
                    return;
                }
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/order\`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': \`Bearer \${token}\`
                        },
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    localStorage.removeItem('ecommerce_cart');
                    updateCartCount();
                    renderCart();
                    showToast('Order placed successfully!');
                    showPage('home');
                } catch (error) {
                    showToast(\`Checkout failed: \${error.message}\`);
                }
            }
            // Address Functions
            function showAddressForm() {
              noAddress.classList.add('hidden');
              addressFormContainer.classList.remove('hidden');
              savedAddress.classList.add('hidden');
              
              if (currentUser.address) {
                document.getElementById('full-name').value = currentUser.address.fullName;
                document.getElementById('phone').value = currentUser.address.phone;
                document.getElementById('address').value = currentUser.address.address;
                document.getElementById('city').value = currentUser.address.city;
                document.getElementById('zip').value = currentUser.address.zip;
                document.getElementById('country').value = currentUser.address.country;
              }
            }
            
            async function saveAddress(e) {
                e.preventDefault();
                const token = localStorage.getItem('ecommerce_token');
                const address = {
                    fullName: document.getElementById('full-name').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    zip: document.getElementById('zip').value,
                    country: document.getElementById('country').value
                };
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/address\`, {
                        method: 'PUT',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': \`Bearer \${token}\`
                        },
                        body: JSON.stringify(address),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);
                    
                    currentUser.address = data.address;
                    localStorage.setItem('ecommerce_currentUser', JSON.stringify(currentUser));
                    
                    renderAddress();
                    showToast('Address saved successfully');
                } catch (error) {
                    showToast(\`Failed to save address: \${error.message}\`);
                }
            }
            function renderAddress() {
              if (!currentUser?.address) {
                noAddress.classList.remove('hidden');
                addressFormContainer.classList.add('hidden');
                savedAddress.classList.add('hidden');
                return;
              }

              noAddress.classList.add('hidden');
              addressFormContainer.classList.add('hidden');
              savedAddress.classList.remove('hidden');
              const address = currentUser.address;
              addressDetails.innerHTML = \`
                <p><strong>Name:</strong> \${address.fullName}</p>
                <p><strong>Phone:</strong> \${address.phone}</p>
                <p><strong>Address:</strong> \${address.address}</p>
                <p><strong>City:</strong> \${address.city}</p>
                <p><strong>ZIP:</strong> \${address.zip}</p>
                <p><strong>Country:</strong> \${address.country}</p>
              \`;
            }
            function editAddress() {
                showAddressForm();
            }
            // Admin Functions
            async function renderAdminProducts() {
                adminProductsList.innerHTML = '';
                // Since products are part of the static HTML, we don't need to fetch them.
                // The main page is re-deployed with new products.
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50';
                    row.innerHTML = \`
                        <td class="py-2 px-4 border-b">\${product.name}</td>
                        <td class="py-2 px-4 border-b">\${product.description}</td>
                        <td class="py-2 px-4 border-b">\$\${product.price.toFixed(2)}</td>
                        <td class="py-2 px-4 border-b">
                            <button class="delete-product text-red-500 hover:text-red-700" data-id="\${product.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    \`;
                    adminProductsList.appendChild(row);
                });
                document.querySelectorAll('.delete-product').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const productId = e.target.closest('button').getAttribute('data-id');
                        deleteProduct(productId);
                    });
                });
            }
            async function addNewProduct(e) {
                e.preventDefault();
                const token = localStorage.getItem('ecommerce_token');
                const name = document.getElementById('product-name').value;
                const price = parseFloat(document.getElementById('product-price').value);
                const description = document.getElementById('product-description').value;
                const image = document.getElementById('product-image').value;
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/add-product\`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': \`Bearer \${token}\`
                        },
                        body: JSON.stringify({ name, description, price, image }),
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error);

                    products.push(data.product);
                    
                    document.getElementById('new-product-form').reset();
                    addProductForm.classList.add('hidden');
                    renderAdminProducts();
                    renderProducts();
                    showToast('Product added successfully');
                } catch (error) {
                    showToast(\`Failed to add product: \${error.message}\`);
                }
            }
            async function deleteProduct(productId) {
                if (confirm('Are you sure you want to delete this product?')) {
                    const token = localStorage.getItem('ecommerce_token');
                    try {
                        const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/product/\${productId}\`, {
                            method: 'DELETE',
                            headers: { 'Authorization': \`Bearer \${token}\` },
                        });
                        const data = await response.json();
                        if (!response.ok) throw new Error(data.error);

                        products = products.filter(p => p.id !== productId);
                        
                        renderAdminProducts();
                        renderProducts();
                        showToast('Product deleted successfully');
                    } catch (error) {
                        showToast(\`Failed to delete product: \${error.message}\`);
                    }
                }
            }
            
            async function renderOrders() {
                ordersList.innerHTML = '';
                const token = localStorage.getItem('ecommerce_token');
                try {
                    const response = await fetch(\`\${API_BASE_URL}/api/ecommerce/\${ecommerceId}/orders\`, {
                        headers: { 'Authorization': \`Bearer \${token}\` },
                    });
                    const orders = await response.json();
                    if (!response.ok) throw new Error(orders.error);
                    if (orders.length === 0) {
                        ordersList.innerHTML = \`
                            <tr>
                                <td colspan="6" class="py-4 text-center text-gray-500">No orders yet</td>
                            </tr>
                        \`;
                        return;
                    }
                    
                    orders.forEach(order => {
                        const row = document.createElement('tr');
                        row.className = 'hover:bg-gray-50';
                        
                        const itemsList = order.items.map(item => 
                            \`\${item.name} (\${item.quantity} x \$\${item.price.toFixed(2)})\`
                        ).join('<br>');
                        
                        row.innerHTML = \`
                            <td class="py-2 px-4 border-b">\${order._id.substring(0, 8)}...</td>
                            <td class="py-2 px-4 border-b">\${order.customerName}</td>
                            <td class="py-2 px-4 border-b">\${itemsList}</td>
                            <td class="py-2 px-4 border-b">\$\${order.total.toFixed(2)}</td>
                            <td class="py-2 px-4 border-b">\${order.phone}</td>
                            <td class="py-2 px-4 border-b">
                                \${order.address.address}, \${order.address.city}, \${order.address.zip}, \${order.address.country}
                            </td>
                        \`;
                        ordersList.appendChild(row);
                    });
                } catch (error) {
                    ordersList.innerHTML = \`
                        <tr>
                            <td colspan="6" class="py-4 text-center text-red-500">Failed to load orders: \${error.message}</td>
                        </tr>
                    \`;
                }
            }
            // Utility Functions
            function showToast(message) {
              const toast = document.createElement('div');
              toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
              toast.textContent = message;
              document.body.appendChild(toast);
              setTimeout(() => {
                toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
                setTimeout(() => toast.remove(), 300);
              }, 3000);
            }
          </script>
        </body>
        </html>
      `;
      const ecommerceData = {
        templateId,
        components: JSON.stringify(finalComponents),
        htmlContent,
        repoUrl,
      };
      let res;
      if (ecommerceId) {
        res = await axios.put(`${API_BASE_URL}/api/ecommerce/${ecommerceId}`, ecommerceData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        res = await axios.post(`${API_BASE_URL}/api/ecommerce/create`, ecommerceData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setEcommerceId(res.data.ecommerceId);
        setRepoUrl(res.data.repoUrl);
        setAdminCredentials(res.data.adminCredentials);
      }

      setDeployedUrl(res.data.githubPagesUrl);
      setDeploySuccess(true);
      await controls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.5 },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setUploadError(`Failed to ${ecommerceId ? 'update' : 'create'} e-commerce store: ${errorMessage}`);
      await controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.5 },
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const qrUrl = deployedUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(deployedUrl)}` : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="flex flex-col lg:flex-row h-full w-full">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          style={{ maxHeight: '100vh' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </motion.button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                {ecommerceId ? 'Edit' : 'Create'} E-commerce Store: {templateId.replace('templateEcommerce', 'Template ')}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
            >
              {previewMode ? 'Hide Preview' : 'Show Preview'}
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Basic Information
              </label>
              <input
                type="text"
                placeholder="Shop Name"
                value={components.shopName}
                onChange={(e) => setComponents({ ...components, shopName: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <textarea
                placeholder="Shop Description"
                value={components.shopDescription}
                onChange={(e) => setComponents({ ...components, shopDescription: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                rows="4"
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={components.email}
                onChange={(e) => setComponents({ ...components, email: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number (e.g., +1234567890)"
                value={components.whatsapp}
                onChange={(e) => setComponents({ ...components, whatsapp: e.target.value })}
                className="w-full p-3 mt-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Products
              </label>
              {components.products.map((product, index) => (
                <div key={product.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                  <textarea
                    placeholder="Product Description"
                    value={product.description}
                    onChange={(e) => updateProduct(index, 'description', e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    rows="3"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    className="w-full p-3 mb-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    min="0"
                    step="0.01"
                    required
                  />
                  <input
                    type="file"
                    id={`product-image-${product.id}`}
                    accept="image/*"
                    className="w-full p-3 mb-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  {product.image && (
                    <img
                      src={product.image}
                      alt="Product Preview"
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                </div>
              ))}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addProduct}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors duration-200"
                >
                  Add Product
                </motion.button>
                {components.products.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={removeLastProduct}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
                  >
                    Remove Last Product
                  </motion.button>
                )}
              </div>
            </motion.div>

            {deployedUrl && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700"
              >
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Store Deployed
                </h3>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Wait 30 to 60 sec to open the link
                </h3>
                <p className="text-blue-600 dark:text-blue-300">
                  Your store is live at:{' '}
                  <a
                    href={deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800 dark:hover:text-blue-100 break-all"
                  >
                    {deployedUrl}
                  </a>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={copyToClipboard}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                >
                  Copy Link
                </motion.button>
                {adminCredentials && (
                  <div className="mt-3">
                    <p className="text-blue-600 dark:text-blue-300">
                      <strong>Admin Credentials:</strong>
                      <br />
                      Username: {adminCredentials.username}
                      <br />
                      Password: {adminCredentials.password}
                    </p>
                    <p className="text-sm text-blue-500 dark:text-blue-400 mt-1">
                      Admin credentials are sent to your whatsapp
                    </p>
                  </div>
                )}
                {qrUrl && (
                  <div className="mt-3">
                    <p className="text-blue-600 dark:text-blue-300 mb-2">
                      <strong>QR Code for Store:</strong>
                    </p>
                    <img
                      src={qrUrl}
                      alt="QR Code"
                      className="w-32 h-32 object-contain"
                    />
                    <a
                      href={qrUrl}
                      download="qr_code.png"
                      className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
                    >
                      Download QR Code
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            {uploadError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-700 text-red-600 dark:text-red-300"
              >
                {uploadError}
              </motion.div>
            )}

            {deploySuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700 text-green-600 dark:text-green-300"
              >
                Store {ecommerceId ? 'updated' : 'created'} successfully!
              </motion.div>
            )}

            <motion.div
              animate={buttonControls}
              className="flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={uploading || isDeploying}
                className={`flex-1 bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 ${
                  (uploading || isDeploying) && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isDeploying ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Deploying...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.22 6a6 6 0 016 6H7z"
                      />
                    </svg>
                    {ecommerceId ? 'Update Store' : 'Create & Deploy Store'}
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <AnimatePresence>
          {previewMode && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto"
              style={{ maxHeight: '100vh' }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Preview
              </h2>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
                <SelectedTemplate components={components} ecommerceId={ecommerceId} onNavigate={navigate} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TemplateEditorEcommerce;