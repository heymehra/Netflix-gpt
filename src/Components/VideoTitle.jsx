import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
<div className='w-screen aspect-video pt-[17%] px-12 absolute text-white bg-gradient-to-r from-black'>
 <h1 className="text-2xl md:text-4xl font-bold sm:text-2xl">{title}</h1>
  <p className="hidden md:inline-block py-4 text-lg max-w-xl sm:text-base">{overview}</p>

  <div className='flex gap-4 mt-4'>
    <button className='flex items-center gap-2 bg-white text-black font-semibold py-2 px-6 rounded hover:bg-gray-300 transition'>
      ▶️ Play
    </button>
    <button className='hidden md:inline-block items-center gap-2 bg-gray-600 text-white font-semibold py-2 px-6 rounded hover:bg-gray-700 transition'>
      ℹ️ More Info
    </button>
  </div>
</div>

  )
}

export default VideoTitle