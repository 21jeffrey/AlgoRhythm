import React from 'react'
import { Loader } from 'lucide-react'

function Loading() {
   return (
      <div className="min-h-  flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-100 text-lg">Loading  data...</p>
        </div>
      </div>
    );
}

export default Loading