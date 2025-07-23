import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const Modal = ({ modalCloseFunc, title, addMemberModalContent }) => {
    const onClickOfX = () => {
        modalCloseFunc();
    }
    return (
        <div className='text-black text-3xl fixed inset-0 bg-black bg-opacity-50'>
            <div className='w-[90%] h-[80%] md:w-1/2 md:h-[70%] mx-auto mt-20 bg-white text-black rounded-xl p-5'>
                <div className='flex justify-between'>
                    <div className='text-3xl font-sans'>{title}</div>
                    <div className='text-3xl font-sans cursor-pointer ' onClick={onClickOfX}><CloseIcon /></div>
                </div>
                <div className='mt-10'>
                    {addMemberModalContent}
                </div>
            </div>
        </div>
    )
}

export default Modal