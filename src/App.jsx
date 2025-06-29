import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {createHashRouter, RouterProvider} from "react-router-dom"

import HomeScreen from './pages/HomeScreen/HomeScreen'
import MemoryGame from './pages/GameDesign/GameScreen'

const router = createHashRouter([
  {path: '/', element: <HomeScreen />},
  {path: '/game/:level', element: <MemoryGame /> },
  // {path:'*', element: <NotFoundPage/>}

])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
