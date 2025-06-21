import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createHashRouter, RouterProvider} from "react-router-dom"

import HomeScreen from './pages/HomeScreen/HomeScreen'
import GameScreen from './pages/GameDesign/GameScreen'

const router = createHashRouter([
  {path: '/', element: <HomeScreen />},
  {path: '/game/:level', element: <GameScreen /> },
  // {path:'*', element: <NotFoundPage/>}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
