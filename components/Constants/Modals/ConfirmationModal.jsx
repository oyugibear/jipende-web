'use client'

import { Modal } from 'antd';
import React from 'react'

export default function ConfirmationModal({isOpen, setIsOpen, setRefresh, handleFunction}) {
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        <Modal open={isOpen} onCancel={handleCancel}  footer={[<button onClick={handleFunction}  className={`bg-red-500 text-white font-bold rounded-lg py-2 px-4`}> Submit </button>]} >
            <div className='flex flex-col items-center my-4 py-8'>
                <p className='text-lg font-bold '>Are you sure? </p>
                <p className='text-sm text-center'>This action can not be undone, it is final</p>
            </div>
        </Modal>
    )
}
