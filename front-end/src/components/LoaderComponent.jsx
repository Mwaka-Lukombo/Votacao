import { Loader } from 'lucide-react'
import React from 'react'

export const LoaderComponent = ({size}) => {
  return (
    <Loader className='animate-spin text-white' size={size} />
  )
}
