import React from 'react'

function Loader() {
  return (
   <div id="loader" className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full border-4 border-t-4 border-violet-800 border-t-transparent w-12 h-12" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>

  )
}

export default Loader