import './globals.css'

 
export const metadata = {
  title: 'AlgoRhythm',
  description: 'A platform for coding and algorithm challenges',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
</head>

      <body>{children}</body>
    </html>
  )
}