'use client'

import PictureHero from '@/components/Constants/PictureHero'
import InfoCard from '@/components/Pages/ServiceDescriptions/InfoCard'
import { Image } from 'antd'
import React, { useState } from 'react'
import { FiDownload, FiExternalLink } from 'react-icons/fi'

export default function PDFViewer() {
    const [pdfError, setPdfError] = useState(false)
    
    const handleDownloadPDF = () => {
      const link = document.createElement('a')
      link.href = '/assets/pdfs/Jipende_Services.pdf'
      link.download = 'Jipende_Services.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const handleOpenPDF = () => {
      window.open('/assets/pdfs/Jipende_Services.pdf', '_blank')
    }

    return (
                
      <div className='w-full max-w-[1024px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg'>
          <div className='bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Service Details Document</h3>
              <div className='flex gap-2'>
                  <button onClick={handleDownloadPDF}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm'
                  >
                      <FiDownload size={16} />
                      Download PDF
                  </button>
                  <button
                      onClick={handleOpenPDF}
                      className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm'
                  >
                      <FiExternalLink size={16} />
                      Open in New Tab
                  </button>
              </div>
          </div>
          
          {/* PDF Embed with fallback */}
          <div className='relative'>
              {!pdfError ? (
                  <object
                      data="/assets/pdfs/Jipende_Services.pdf"
                      type="application/pdf"
                      width="100%"
                      height="600"
                      className='w-full'
                      onError={() => setPdfError(true)}
                  >
                      <iframe
                          src="/assets/pdfs/Jipende_Services.pdf"
                          width="100%"
                          height="600"
                          frameBorder="0"
                          onError={() => setPdfError(true)}
                      >
                          <div className='p-8 text-center bg-gray-50'>
                              <p className='text-gray-600 mb-4'>
                                  Your browser doesn't support PDF viewing.
                              </p>
                              <button
                                  onClick={handleDownloadPDF}
                                  className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                              >
                                  <FiDownload size={20} />
                                  Download PDF to View
                              </button>
                          </div>
                      </iframe>
                  </object>
              ) : (
                  <div className='p-8 text-center bg-gray-50 h-[600px] flex flex-col items-center justify-center'>
                      <div className='mb-6'>
                          <svg className='mx-auto h-16 w-16 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                          </svg>
                      </div>
                      <h4 className='text-lg font-medium text-gray-900 mb-2'>PDF Preview Not Available</h4>
                      <p className='text-gray-600 mb-6'>
                          Your browser doesn't support inline PDF viewing. Please download the file to view it.
                      </p>
                      <div className='flex gap-3'>
                          <button
                              onClick={handleDownloadPDF}
                              className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                          >
                              <FiDownload size={20} />
                              Download PDF
                          </button>
                          <button
                              onClick={handleOpenPDF}
                              className='inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                          >
                              <FiExternalLink size={20} />
                              Open in New Tab
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
    )
}