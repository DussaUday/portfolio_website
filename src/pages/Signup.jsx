import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedBackground, FloatingShapes } from './Login';

function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  const formik = useFormik({
    initialValues: { email: '', otp: '', password: '' },
    validationSchema: Yup.object({
      email: !showOtp ? Yup.string().email('Invalid email').required('Required') : Yup.string(),
      otp: showOtp ? Yup.string().length(6, 'OTP must be 6 digits').required('Required') : Yup.string(),
      password: showOtp ? Yup.string().min(6, 'Minimum 6 characters').required('Required') : Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (!showOtp) {
          // Request OTP
          await axios.post('https://dev-server-tvbl.onrender.com/api/auth/signup/initiate', { email: values.email });
          setTempEmail(values.email);
          setShowOtp(true);
        } else {
          // Verify OTP and complete signup
          const res = await axios.post('https://dev-server-tvbl.onrender.com/api/auth/signup/verify', {
            email: tempEmail,
            otp: values.otp,
            password: values.password,
          });
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900">
      
      <AnimatedBackground />
      <FloatingShapes />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md border border-purple-200/50 dark:border-gray-700 overflow-hidden"
      >
        <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </motion.button>
        <motion.div 
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-100/30 dark:bg-purple-900/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <div className="relative z-20">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            {showOtp ? 'Verify your email with OTP' : 'Get started with your account'}
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {!showOtp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600/50 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </motion.div>
                {formik.touched.email && formik.errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-xs mt-1"
                  >
                    {formik.errors.email}
                  </motion.p>
                )}
              </div>
            )}

            {showOtp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OTP
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.otp}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600/50 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      maxLength={6}
                    />
                  </motion.div>
                  {formik.touched.otp && formik.errors.otp && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-xs mt-1"
                    >
                      {formik.errors.otp}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-600/50 transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </motion.div>
                  {formik.touched.password && formik.errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-xs mt-1"
                    >
                      {formik.errors.password}
                    </motion.p>
                  )}
                </div>
              </>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-700/30 transition-all duration-300 relative overflow-hidden"
            >
              <motion.span
                animate={{ opacity: isSubmitting ? 0 : 1 }}
                className="relative z-10"
              >
                {showOtp ? 'Verify OTP' : 'Send OTP'}
              </motion.span>
              {isSubmitting && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              )}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </form>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;