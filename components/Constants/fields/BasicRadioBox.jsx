'use client'

import { Flex, Radio } from 'antd'
import React from 'react'

export default function BasicRadioBox({label, value, setValue, error}) {
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    e.target.value == 'yes' ? setValue(true) : setValue(false)
  };

  // Convert boolean value to string for Radio.Group
  const getRadioValue = () => {
    if (value === true) return 'yes'
    if (value === false) return 'no'
    return undefined // No selection made yet
  }

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor="name" className={error ? 'text-red-500' : ''}>{label}</label>
      <Flex vertical gap="middle">
        <Radio.Group 
          onChange={onChange} 
          value={getRadioValue()}
          className={error ? 'border border-red-300 rounded p-2' : ''}
        >
          <Radio.Button value="yes">Yes</Radio.Button>
          <Radio.Button value="no">No</Radio.Button>
        </Radio.Group>
      </Flex>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}
