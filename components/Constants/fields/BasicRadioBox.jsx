'use client'

import { Flex, Radio } from 'antd'
import React from 'react'

export default function BasicRadioBox({label, value, setValue}) {
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    e.target.value == 'yes' ? setValue(true) : setValue(false)
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor="name">{label}</label>
      <Flex vertical gap="middle">
        <Radio.Group onChange={onChange} defaultValue="no">
          <Radio.Button value="yes">Yes</Radio.Button>
          <Radio.Button value="no">No</Radio.Button>
        </Radio.Group>
      </Flex>
    </div>
  )
}
