'use client'

import { Flex, Radio } from 'antd'
import React from 'react'

export default function MultipleChoiceRadio({label, value, options, setValue, error, required}) {
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    setValue(e.target.value)
  };

  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="name" className={error ? 'text-red-500' : ''}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Flex vertical gap="middle">
            <Radio.Group 
              onChange={onChange} 
              value={value}
              className={error ? 'border border-red-300 rounded p-2' : ''}
            >
                {options.map((option) => (
                    <Radio.Button key={option} value={option}>{option}</Radio.Button>
                ))}
            </Radio.Group>
        </Flex>
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}