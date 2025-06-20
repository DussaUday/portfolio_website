import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedBackground, FloatingShapes } from './Login';

function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1 = email entry, 2 = OTP & new password, 3 = success
  const [emailSent, setEmailSent] = useState('');

  const formik = useFormik({
    initialValues: { 
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().when('step', {
        is: 1,
        then: Yup.string().email('Invalid email').required('Required')
      }),
      otp: Yup.string().when('step', {
        is: 2,
        then: Yup.string().required('OTP is required').matches(/^\d{6}$/, 'Must be 6 digits')
      }),
      newPassword: Yup.string().when('step', {
        is: 2,
        then: Yup.string().min(6, 'Minimum 6 characters').required('Required')
      }),
      confirmPassword: Yup.string().when('step', {
        is: 2,
        then: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          .required('Required')
      })
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        if (step === 1) {
          // Send OTP
          await axios.post('/api/auth/password-reset/initiate', { email: values.email });
          setEmailSent(values.email);
          setStep(2);
        } else if (step === 2) {
          // Verify OTP and reset password
          await axios.post('/api/auth/password-reset/verify', {
            email: emailSent,
            otp: values.otp,
            newPassword: values.newPassword
          });
          setStep(3);
        } else if (step === 3) {
          // Navigate to login
          navigate('/');
        }
      } catch (error) {
        alert(error.response?.data?.error || error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const resendOTP = async () => {
    try {
      await axios.post('/api/auth/password-reset/initiate', { email: emailSent });
      alert('OTP resent successfully');
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gray-950">
      
      <AnimatedBackground />
      <FloatingShapes />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-teal-500/30 overflow-hidden"
      >
        <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => navigate('/')}
                              className="bg-gray-600 text-white px-3 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                              </svg>
                              Home
                            </motion.button>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.05); opacity: 1; }
            }
            @keyframes neonGlow {
              0%, 100% { filter: brightness(100%) drop-shadow(0 0 5px rgba(0, 255, 255, 0.5)); }
              50% { filter: brightness(120%) drop-shadow(0 0 15px rgba(0, 255, 255, 0.8)); }
            }
            .pulse-animation {
              animation: pulse 3s ease-in-out infinite;
            }
            .neon-glow {
              animation: neonGlow 2s ease-in-out infinite;
            }
          `}
        </style>

        <div className="relative z-20">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-600 to-purple-600 flex items-center justify-center shadow-lg pulse-animation">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 neon-glow">
            {step === 1 ? 'Reset Password' : step === 2 ? 'Verify OTP & Set Password' : 'Password Reset'}
          </h2>
          <p className="text-center text-gray-200 mb-8">
            {step === 1 ? 'Enter your email to receive OTP' : 
             step === 2 ? `Enter OTP sent to ${emailSent} and set new password` : 
             'Password reset successfully!'}
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {step === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
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
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-500/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-200 text-gray-100 placeholder-gray-500"
                  />
                </motion.div>
                {formik.touched.email && formik.errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 text-xs mt-1"
                  >
                    {formik.errors.email}
                  </motion.p>
                )}
              </div>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-500/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-200 text-gray-100 placeholder-gray-500"
                    />
                  </motion.div>
                  {formik.touched.otp && formik.errors.otp && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-400 text-xs mt-1"
                    >
                      {formik.errors.otp}
                    </motion.p>
                  )}
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    New Password
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-500/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-200 text-gray-100 placeholder-gray-500"
                    />
                  </motion.div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-400 text-xs mt-1"
                    >
                      {formik.errors.newPassword}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Confirm Password
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileFocus={{ scale: 1.01 }}>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-teal-500/50 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-200 text-gray-100 placeholder-gray-500"
                    />
                  </motion.div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-rose-400 text-xs mt-1"
                    >
                      {formik.errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-gray-200 mb-6">
                  Your password has been successfully reset. You can now log in with your new password.
                </p>
                <Link
                  to="/login"
                  className="inline-block py-3 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-teal-500/40 transition-all duration-300"
                >
                  Go to Login
                </Link>
              </motion.div>
            )}

            {step !== 3 && (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-teal-500/40 transition-all duration-300 relative overflow-hidden"
              >
                <motion.span
                  animate={{ opacity: isSubmitting ? 0 : 1 }}
                  className="relative z-10"
                >
                  {step === 1 ? 'Send OTP' : 'Verify & Reset Password'}
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
              </motion.button>
            )}
          </form>

          {step > 1 && step < 3 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setStep(step - 1)}
              className="w-full mt-4 text-sm text-teal-400 hover:text-teal-300 transition-colors"
            >
              Back
            </motion.button>
          )}
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6 text-sm text-gray-200"
          >
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;