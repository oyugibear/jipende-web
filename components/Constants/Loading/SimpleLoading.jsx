'use client'
import Image from 'next/image'
import React from 'react'

export default function SimpleLoading() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center w-full px-4">
        <div className="flex flex-row items-center animate-pulse gap-2 text-xl">
          <Image src="/icon.png" alt="Loading" width={75} height={75} className=""/>
        </div>
      </div>
  )
}