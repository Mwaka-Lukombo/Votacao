import { axiosInstance } from "../lib/axios";
import {create} from 'zustand';
import {toast} from 'react-hot-toast';



export const useUser = create((set,get) => ({
 isLoading:false,
 isAuth:true,
 user:null,
 login:async(data)=>{
    set({
        isLoading:true
    })
   try {
      const res = await axiosInstance.post(`/users/login`,data);

      set({
        user:res.data.newUser
      })
      toast.success(res.data.message);

   } catch (error) {
     toast.error(error?.response?.data?.message);

     set({
        isLoading:false
     })
   }finally{
     set({
        isLoading:false
     })
   }
 },
 logout:async()=>{
  try {
      const res = await axiosInstance.post(`/users/logout`);

      toast.success(res.data.message);

      set({
        user:null
      });
  } catch (error) {
    toast.error(error?.response?.data?.message); 
  }
 },
 check:async()=>{
  try {
     const res = await axiosInstance.get(`/users/check`);
     set({
       user:res.data
     });    
  } catch (error) {
     console.log(error?.response?.data?.message);
  }finally{
    set({
      isAuth:false
    })
  }
 }
 
}));














