import React from 'react'

export const Card = ({title,value,Icon,status}) => {
  return (
    <div className='col-span-1 min-h-[130px] shadow-md border border-[#cccc]
    rounded-xl p-4
    '>
        {/* top */}
        <div className='flex items-center justify-between'>
            <h3 className='text-xs font-semibold'>{title || "Votacoes activas"}</h3>
            <Icon size={20} className="text-[#cccc]"/>
        </div>

        <div className='mt-4 flex flex-col gap-3'>
            <h3 className='text-3xl font-bold'>{value || 0}</h3>
            {status && (
                <p className='flex items-center gap-3'>
                 <div className='w-[10px] h-[10px] rounded-full bg-green-300 animate-pulse'></div>
                 <span className='text-xs font-bold'>{status}</span>
                </p>
            )}
        </div>
    </div>
  )
}
