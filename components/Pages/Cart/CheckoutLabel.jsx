import React from 'react'

export default function CheckoutLabel({label, amount}) {
  return (
    <div className='flex flex-col my-4'>
        <div className='flex flex-row items-center justify-between mb-4'>
            <p className=''>{label}:</p>
            <p className='font-semibold'>Ksh {amount}</p>
        </div>
        <hr />
    </div>
  )
}
