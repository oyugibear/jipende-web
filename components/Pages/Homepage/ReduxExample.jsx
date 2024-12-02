'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '@/app/GlobalRedux/Features/counter/CounterSlice'

export default function ReduxExample() {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  return (
    <div className='my-12 bg-white flex flex-col w-full py-12'>
        <button onClick={() => dispatch(increment())} className=''>
            Increment
        </button>
        <span className='text-black'>
            {count || 0} 
        </span>
        <button onClick={() => dispatch(decrement())} className=''>
            Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(2))} className=''>
            Increment By 2
        </button>
    </div>
  )
}
