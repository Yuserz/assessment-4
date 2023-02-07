import React from 'react'

export default function MainLayout({children}) {
  
    return (
      <div className='w-full h-screen p-10 flex items-center justify-center'>    
        <div className='w-full lg:w-3/4 rounded-lg flex h-[600px] m-10 shadow-lg overflow-hidden border'>{children}</div>  
      </div>
    )
}
