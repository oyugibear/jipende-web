"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import { ArrowLeftOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { authAPI } from '@/utils/api'

export default function page() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      message.error('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address')
      return
    }

    setLoading(true)
    
    try {
      const response = await authAPI.forgotPassword(email)
      
      if (response && response.status) {
        setEmailSent(true)
        message.success(response.message || 'Password reset email sent successfully!')
      } else {
        message.error(response?.error || 'Failed to send reset email. Please try again.')
      }
      
    } catch (error) {
      console.error('Forgot password error:', error)
      message.error(error.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setEmailSent(false)
    setLoading(true)
    
    try {
      const response = await authAPI.forgotPassword(email)
      
      if (response && response.status) {
        setEmailSent(true)
        message.success(response.message || 'Password reset email sent successfully!')
      } else {
        message.error(response?.error || 'Failed to resend email. Please try again.')
      }
      
    } catch (error) {
      console.error('Resend email error:', error)
      message.error(error.message || 'Failed to resend email. Please try again.')
    } finally {
      setLoading(false)
    }
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

        {!emailSent ? (
          <>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MailOutlined className='text-2xl text-yellow-600' />
              </div>
              <h1 className='text-2xl md:text-3xl font-semibold text-gray-900 mb-2'>
                Forgot Password?
              </h1>
              <p className='text-gray-600 text-sm max-w-sm'>
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='w-full'>
              <div className='flex flex-col w-full items-start mb-6'>
                <label className='text-xs text-gray-600 font-medium mb-2'>
                  Email Address
                </label>
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  placeholder="Enter your email address"
                  className='p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all'
                  disabled={loading}
                />
              </div>

              <button 
                type='submit' 
                disabled={loading}
                className='w-full bg-[#FFD02A] hover:bg-yellow-400 text-black uppercase flex justify-center items-center font-bold p-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2'></div>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className='flex flex-col items-center justify-center gap-4 mt-8'>
              <Link href='/auth/register'>
                <p className='text-sm text-gray-600 hover:text-gray-800'>
                  Don't have an account? <span className='font-bold underline text-yellow-600'>Sign Up</span>
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
                Check Your Email
              </h1>
              
              <p className='text-gray-600 text-sm mb-2'>
                We've sent a password reset link to:
              </p>
              
              <p className='font-semibold text-gray-900 mb-6'>
                {email}
              </p>
              
              <div className='bg-blue-50 border border-blue-200 rounded-md p-4 mb-6'>
                <p className='text-sm text-blue-800'>
                  <strong>Didn't receive the email?</strong> Check your spam folder or contact support if you continue to have issues.
                </p>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3 w-full'>
                <Link href='/auth/resetPassword' className='block w-full'>
                  <button className='w-full bg-[#FFD02A] hover:bg-yellow-400 text-black font-bold p-3 rounded-md transition-colors'>
                    Enter Reset Code
                  </button>
                </Link>
                
                <button 
                  onClick={handleResendEmail}
                  disabled={loading}
                  className='w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium p-3 rounded-md transition-colors disabled:opacity-50'
                >
                  {loading ? 'Sending...' : 'Resend Email'}
                </button>
                
                <Link href='/auth/login' className='block w-full'>
                  <button className='w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium p-3 rounded-md transition-colors'>
                    Back to Sign In
                  </button>
                </Link>
              </div>
              
              {/* Help Text */}
              <div className='mt-8 text-center'>
                <p className='text-xs text-gray-500'>
                  Already have your code? <Link href='/auth/resetPassword' className='text-blue-600 hover:underline'>Reset your password here</Link>
                </p>
                <p className='text-xs text-gray-500 mt-2'>
                  Still having trouble? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
