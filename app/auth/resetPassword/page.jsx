"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { message } from 'antd'
import { ArrowLeftOutlined, LockOutlined, CheckCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { authAPI } from '@/utils/api'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get email and code from URL parameters if provided
    const emailParam = searchParams.get('email')
    const codeParam = searchParams.get('code')
    
    if (emailParam) setEmail(emailParam)
    if (codeParam) setConfirmationCode(codeParam)
  }, [searchParams])

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!email || !confirmationCode || !newPassword || !confirmPassword) {
      message.error('Please fill in all fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address')
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      message.error(passwordError)
      return
    }

    if (newPassword !== confirmPassword) {
      message.error('Passwords do not match')
      return
    }

    setLoading(true)
    
    try {
      const response = await authAPI.resetPassword({
        email,
        confirmationCode,
        newPassword
      })
      
      if (response && response.ok) {
        setPasswordReset(true)
        message.success('Password reset successfully!')
      } else {
        message.error('Invalid email or confirmation code. Please check and try again.')
      }
      
    } catch (error) {
      console.error('Reset password error:', error)
      message.error(error.message || 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRedirectToLogin = () => {
    router.push('/auth/login')
  }

  return (
    <div className='w-full flex flex-col py-12 px-4 items-center justify-center min-h-screen bg-gray-50'>
      <div className='flex flex-col items-center justify-center w-full max-w-[470px] bg-white p-8 rounded-lg shadow-lg'>
        
        {/* Back to Sign In Link */}
        <div className='w-full mb-6'>
          <Link href='/auth/login' className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'>
            <ArrowLeftOutlined className='mr-2' />
            <span className='text-sm'>Back to Sign In</span>
          </Link>
        </div>

        {!passwordReset ? (
          <>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <LockOutlined className='text-2xl text-blue-600' />
              </div>
              <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-2'>
                Reset Your Password
              </h1>
              <p className='text-gray-600 text-sm max-w-sm'>
                Enter your email, confirmation code, and new password to reset your account password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='w-full space-y-4'>
              <div className='flex flex-col w-full items-start'>
                <label className='text-xs text-gray-600 font-medium mb-2'>
                  Email Address
                </label>
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  placeholder="Enter your email address"
                  className='p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  disabled={loading}
                />
              </div>

              <div className='flex flex-col w-full items-start'>
                <label className='text-xs text-gray-600 font-medium mb-2'>
                  Confirmation Code
                </label>
                <input 
                  value={confirmationCode} 
                  onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())} 
                  type="text" 
                  placeholder="Enter 6-digit confirmation code"
                  className='p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase tracking-wider'
                  maxLength={6}
                  disabled={loading}
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Check your email for the 6-digit code we sent you
                </p>
              </div>

              <div className='flex flex-col w-full items-start'>
                <label className='text-xs text-gray-600 font-medium mb-2'>
                  New Password
                </label>
                <div className='relative w-full'>
                  <input 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className='p-3 pr-12 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
                <p className='text-xs text-gray-500 mt-1'>
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className='flex flex-col w-full items-start'>
                <label className='text-xs text-gray-600 font-medium mb-2'>
                  Confirm New Password
                </label>
                <div className='relative w-full'>
                  <input 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className='p-3 pr-12 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </button>
                </div>
              </div>

              <button 
                type='submit' 
                disabled={loading}
                className='w-full bg-[#FFD02A] hover:bg-yellow-400 text-black uppercase flex justify-center items-center font-bold p-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6'
              >
                {loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2'></div>
                    Resetting Password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className='flex flex-col items-center justify-center gap-4 mt-8'>
              <Link href='/auth/forgotPassword'>
                <p className='text-sm text-gray-600 hover:text-gray-800'>
                  Need a new code? <span className='font-bold underline text-blue-600'>Request Reset Email</span>
                </p>
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <CheckCircleOutlined className='text-2xl text-green-600' />
              </div>
              
              <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-4'>
                Password Reset Successfully!
              </h1>
              
              <p className='text-gray-600 text-sm mb-6'>
                Your password has been reset successfully. You can now sign in with your new password.
              </p>

              {/* Action Button */}
              <button 
                onClick={handleRedirectToLogin}
                className='w-full bg-[#FFD02A] hover:bg-yellow-400 text-black font-bold p-3 rounded-md transition-colors mb-4'
              >
                Sign In Now
              </button>
              
              {/* Help Text */}
              <div className='mt-6 text-center'>
                <p className='text-xs text-gray-500'>
                  Having trouble signing in? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
