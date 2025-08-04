import React, { useState } from 'react'
import { PiHeart, PiEnvelope, PiCheck, PiSparkle, PiGlobe } from 'react-icons/pi'

export default function Cta() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail('')
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }, 1000)
  }

  return (
    <div className='w-full py-16 bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-200 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-10 left-10 w-20 h-20 bg-white rounded-full'></div>
        <div className='absolute bottom-16 right-16 w-16 h-16 bg-white rounded-full'></div>
        <div className='absolute top-1/3 right-1/4 w-12 h-12 bg-white rounded-full'></div>
        <div className='absolute bottom-1/3 left-1/4 w-8 h-8 bg-white rounded-full'></div>
      </div>

      <div className='max-w-6xl mx-auto px-6 lg:px-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          
          {/* Content Section */}
          <div className='text-center lg:text-left space-y-6'>
            <div className='flex items-center justify-center lg:justify-start gap-2 mb-4'>
              <div className='p-2 bg-white/20 rounded-full backdrop-blur-sm'>
                <PiHeart size={24} className='text-black' />
              </div>
              <PiSparkle size={20} className='text-black' />
            </div>
            
            <h3 className='text-3xl lg:text-4xl font-bold text-black leading-tight'>
              Transform Your Mental
              <span className='block text-black'>Wellness Journey</span>
            </h3>
            
            <p className='text-lg text-black leading-relaxed max-w-lg mx-auto lg:mx-0'>
              Join thousands across Africa, Europe, and North America receiving weekly mental health insights, 
              expert tips, and exclusive wellness resources delivered to your inbox.
            </p>

            {/* Benefits list */}
            <div className='space-y-3 text-left max-w-lg mx-auto lg:mx-0'>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                  <PiCheck size={12} className='text-white' />
                </div>
                <span className='text-black'>Weekly mental health tips & strategies</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                  <PiCheck size={12} className='text-white' />
                </div>
                <span className='text-black'>Early access to new therapy programs</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0'>
                  <PiCheck size={12} className='text-white' />
                </div>
                <span className='text-black'>Exclusive wellness resources & guides</span>
              </div>
            </div>

            {/* Global reach indicator */}
            <div className='flex items-center justify-center lg:justify-start gap-2 pt-4'>
              <PiGlobe size={16} className='text-slate-600' />
              <span className='text-sm text-slate-600 font-medium'>
                Trusted worldwide
              </span>
            </div>
          </div>

          {/* Newsletter Form Section */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20'>
            <div className='text-center mb-6'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-4 shadow-lg'>
                <PiEnvelope size={24} className='text-black' />
              </div>
              <h4 className='text-xl font-semibold text-black mb-2'>
                Start Your Wellness Journey
              </h4>
              <p className='text-slate-600 text-sm'>
                Get started with our free mental health newsletter
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative'>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  className='w-full px-6 py-4 text-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-base'
                  required
                />
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                  <PiEnvelope size={20} className='text-slate-400' />
                </div>
              </div>
              
              <button 
                type='submit'
                disabled={isLoading || isSubscribed}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isSubscribed 
                    ? 'bg-green-500 text-white' 
                    // : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white'
                    : 'bg-black text-white hover:bg-black/90'
                } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isLoading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    <span>Subscribing...</span>
                  </div>
                ) : isSubscribed ? (
                  <div className='flex items-center justify-center gap-2'>
                    <PiCheck size={20} />
                    <span>Successfully Subscribed!</span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center gap-2'>
                    <PiHeart size={20} />
                    <span>Start My Wellness Journey</span>
                  </div>
                )}
              </button>
            </form>

            <p className='text-xs text-slate-500 text-center mt-4 leading-relaxed'>
              By subscribing, you agree to receive mental health tips and resources. 
              Unsubscribe anytime with one click. We respect your privacy.
            </p>

            {/* Social proof */}
            <div className='flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-200'>
              <div className='text-center'>
                <div className='text-lg font-bold text-black'>4.9★</div>
                <div className='text-xs text-slate-500'>User Rating</div>
              </div>
              <div className='w-px h-8 bg-slate-200'></div>
              <div className='text-center'>
                <div className='text-lg font-bold text-black'>270</div>
                <div className='text-xs text-slate-500'>Subscribers</div>
              </div>
              <div className='w-px h-8 bg-slate-200'></div>
              <div className='text-center'>
                <div className='text-lg font-bold text-black'>95%</div>
                <div className='text-xs text-slate-500'>Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
