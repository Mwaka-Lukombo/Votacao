import React from 'react'
import { 
  useUser
 } from '../store/userStore'
 import {
  Bell,
  ChartArea,
  Home,
  PenBox,
  Users
 } from 'lucide-react';
import { Title } from '../components/Title';
import { Card } from '../components/Card';

export const HomePage = () => {

  const {
   logout,
   user
  } = useUser();

  
  return (
    <div className='py-4'>
      
      {/* menu */}
      <div className='flex items-center justify-between'>
        <Title text={"Dashboard"}/>

        <div className='flex items-center justify-end gap-2'>

          {/* notification */}
          <div className='relative w-[40px] h-[40px] flex items-center justify-center'>
            <Bell />

            <div className='absolute top-0 right-0 w-[15px] h-[15px] bg-primary-color
            rounded-full flex items-center justify-center
            '>
              <span className='text-xs font-bold text-white'>0</span>
            </div>
          </div>

          {/* user settings */}
          <div className='flex items-center gap-3'>
            
            <div className='w-[40px] h-[40px] border rounded-full'>
              <img src='/images/user.png' 
               className='w-full h-full bg-center bg-contain'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className='text-sm'>{user?.userName.split(" ")[0]} {user?.userName.split(" ").pop()}</h3>
              <p className='text-xs font-bold'>{user?.userIdentify}</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* content */}
      <div className='mt-7 grid md:grid-cols-4 gap-3'>
        <Card title={"Votações Ativas"} Icon={Home} value={12} status={"Active"}/>
         <Card title={"Total de Votos"} Icon={ChartArea} value={"12,450"}/>
          <Card title={"Total Participantes"} Icon={Users} value={"859"} status={"15%"}/>
          <Card title={"Taxa de Participação"} Icon={PenBox} value={"85%"}/>
      </div>
      
    </div>
  )
}
