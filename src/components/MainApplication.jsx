import React from 'react'
import ReplySection from './ReplySection'
import CommentsContainer from './CommentsContainer'

const MainApplication = () => {
  return (
    <div className='w-[95%] mobile:w-[85%] small-device:w-[75%] laptop:w-[51%] flex flex-col justify-between items-center py-[40px] gap-[20px] h-screen'>
      <CommentsContainer />
      <ReplySection type="SEND" />
    </div>
  )
}

export default MainApplication