import React from "react"
import Login from"./login/page"

import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


export default function Home() {
  return (
    <main>
      <React.StrictMode>
         <PrimeReactProvider>
           <Login />
        </PrimeReactProvider>
      </React.StrictMode>
    </main>
  )
}
