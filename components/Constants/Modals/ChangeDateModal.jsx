import React from 'react'

export default function ChangeDateModal({isOpen, setIsOpen, setRefresh, type, serviceDetails}) {
    const handleCancel = () => {
        setIsOpen(false);
    }
    

    return (
        <Modal open={isOpen} onCancel={handleCancel} footer={[<button onClick={handleCancel}  className={`bg-yellow-500 text-white font-bold rounded-lg py-2 px-4 ${!date && 'bg-gray-400 cursor-default'}`}> Submit </button>]} >
            <div className='flex flex-col items-center my-4 py-8'>
                <p className='text-lg font-bold '>Select Session Date & Time</p>
                <p className='text-sm text-center'>Please select the date and time you would like to attend this session</p>
                
                
                <div className='flex flex-col md:flex-row items-center gap-4 my-4'>
                <div className='flex flex-col items-start w-full'>
                    <label className='text-sm'>Date</label>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='p-2 max-w-[200px] border rounded-md w-full' />
                </div>
                <div className='flex flex-col items-start w-full'>
                    <label className='text-sm'>Time</label>
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        className='p-2 max-w-[200px] border rounded-md w-full'
                        min="09:00" // Set min time to 09:00 (9:00 AM)
                        max="17:30" // Set max time to 17:30 (5:30 PM)
                        step="1800" // Set step to 1800 seconds (30 minutes)
                        // disabled={!isWeekday(date)} // Disable input if selected date is not a weekday
                    />
                </div>
                </div>
            </div>
        </Modal>
    )
}
