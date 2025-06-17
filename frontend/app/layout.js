'use client';
import './globals.css'
import { Toaster } from 'react-hot-toast';

 
const metadata = {
  title: 'AlgoRhythm',
  description: 'A platform for coding and algorithm challenges',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
</head>

      <body>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        </body>
    </html>
  )
}