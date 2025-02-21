'use client'

import { Flex, Radio } from 'antd'
import React from 'react'

export default function MultipleChoiceRadio({label, value, options, setValue}) {
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
    setValue(e.target.value)
  };

  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="name">{label}</label>
        <Flex vertical gap="middle">
            <Radio.Group onChange={onChange} defaultValue={options[0]}>
                {options.map((value) => (
                    <Radio.Button key={value} value={value}>{value}</Radio.Button>
                ))}
            </Radio.Group>
        </Flex>
    </div>
  )
}