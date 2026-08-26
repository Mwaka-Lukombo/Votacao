import { Loader, User } from 'lucide-react'
import React, { useState } from 'react'
import { useUser } from '../store/userStore';

export const LoginPage = () => {
    const [userName,setUserName] = useState("");

    const {
        isLoading,
        login
    } = useUser();



    const handleSubmit = async(e)=>{
        e.preventDefault();

        const newUser = {
            userName
        }

        await login(newUser)
    }
    
    
  return (
    <div className='w-full h-screen flex items-center justify-center'>

            
            <div className='max-w-[400px] w-[95%] min-h-[200px] border border-[#ccc] shadow-md rounded-xl'>
                
                <div className='flex flex-col gap-2 p-3 items-center'>
                  <h2 className='text-sm font-semibold'>Faça o login no sistema com o seu nome</h2>
                </div>

                <form onSubmit={handleSubmit} className='w-full p-3'>
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="name" className='text-xs font-semibold'>Name:</label>
                        <input type="text"  
                         placeholder='Insira o seu nome'
                         onChange={(e) => setUserName(e.target.value)}
                         value={userName || ""}
                         className='w-full h-[40px] border border-[#ccc]
                         rounded-md text-xs outline-none pl-8 focus:border-primary-color
                         '
                        />
                        <User className='absolute top-[50%] left-2' size={20}/>
                    </div>

                    <div className='w-full mt-3'>
                        <button disabled={isLoading} className={`flex items-center justify-center w-full h-[40px] border-none bg-primary-color
                        rounded-xl border duration ${isLoading && "hover:cursor-not-allowed"} transition-300 text-xs text-white font-bold hover:bg-secundary-color
                        `}>
                            {!isLoading ? "Login" : <Loader className='animate-spin text-white' />}
                        </button>
                    </div>

                    
                </form>
                <div className='w-full flex items-center justify-center my-2'>
                        <h2 className='text-xs font-bold'>Or</h2>
                    </div>
                
                    <div className='w-full p-3'>
                        <button className={`flex gap-2 items-center justify-center w-full h-[50px] bg-white border-[#ccc] shadow-md
                        rounded-xl border duration  transition-300 text-xs text-black font-bold
                        `}>
                          <img src='/images/google-logo.jpg' 
                          alt='Google logo'
                          className='w-7 h-7 bg-center bg-contain'
                          />
                          <span>Google</span>
                        </button>
                    </div>

                    <div className='mb-2 w-full flex items-center justify-center'>
                        <p className='text-xs font-bold'>Deixe ficar a sua votação</p>
                    </div>
            </div>

    </div>
  )
}
