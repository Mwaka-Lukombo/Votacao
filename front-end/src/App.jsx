import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast';

import { useUser } from './store/userStore'
import {
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { Loader } from 'lucide-react'
import { LoaderComponent } from './components/LoaderComponent'
import { SideBar } from './components/SideBar'
import { Container } from './components/Container'
import { VotacoesPage } from './components/VotacoesPage'
import { ParticipantesPage } from './components/ParticipantesPage'
import { ResultadosPage } from './components/ResultadosPage'
import { SettingsPage } from './components/SettingsPage'


function App() {
  
  const {
    user,
    isAuth,
    check
  } = useUser();

  useEffect(()=>{
    check();
  },[check]);

  if(isAuth){
    return (
      <div className='w-full h-screen bg-black/90 flex items-center justify-center'>
        <LoaderComponent size={30} />
      </div>
    )
  }



  const PrivateRoute = (({children})=>{
     if(!user){
       return <Navigate to="/login" replace />
     }

     return children;
  });

  const PublicRoute = (({children})=> {
     if(user){
       return <Navigate to={"/"} replace />
     }

     return children;
  })





  return (
    <>
     <div className={`${user && "flex"}`}>
      {user && <SideBar />}
      <Routes>
       <Route path='/' element={
        <PrivateRoute>
          <Container>
            <HomePage />
          </Container>
        </PrivateRoute>
       } />

       <Route path='/votacoes' element={
        <PrivateRoute>
          <Container>
            <VotacoesPage />
          </Container>
        </PrivateRoute>
       } />

       <Route path='/participantes' element={
        <PrivateRoute>
          <Container>
            <ParticipantesPage />
          </Container>
        </PrivateRoute>
       } />

       <Route path='/resultados' element={
        <PrivateRoute>
          <Container>
            <ResultadosPage />
          </Container>
        </PrivateRoute>
       } />

       <Route path='/settings' element={
        <PrivateRoute>
          <Container>
            <SettingsPage />
          </Container>
        </PrivateRoute>
       } />



       <Route path='/login' element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
       }/>
     </Routes>
     </div>
     <Toaster />
    </>
  )
}

export default App
