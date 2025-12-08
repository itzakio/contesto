import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'aos/dist/aos.css' 
import { RouterProvider } from 'react-router'
import router from './routes/router'
import ThemeProvider from './Components/ThemeProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
     <RouterProvider router={router}/>
   </ThemeProvider>
  </StrictMode>,
)
