import './globals.css'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar';

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
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  )
}