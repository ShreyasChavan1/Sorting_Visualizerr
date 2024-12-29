import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './backend/context.jsx'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Visualiser from './Visualizer/visualiser.jsx'
import First from './Frontend/First_page.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <First/>,
  },
  {
    path:'/sorts',
    element:<Visualiser/>
  }
]);

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router}/>
  </ContextProvider>,
)
