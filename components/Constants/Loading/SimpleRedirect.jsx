import Link from 'next/link'
import React from 'react'

export default function SimpleRedirect() {
  return (
    <div className="basic-page-settings w-full flex flex-col items-center justify-center h-full">
        <h1 className="text-xl text-slate-400">
          You do not have the appropriate rights to view this page
        </h1>
        <Link href='/auth/login'>
            <button className='action-btn bg-red-500 my-4'>
            Return to Login
            </button>
        </Link>
      </div>
  )
}