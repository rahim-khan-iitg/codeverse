import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from './components/NavBar/navbar'

export default function Document() {
  
  return (
    <Html lang="en">
      <Head />
      <body>
          {/* <Navbar login={'login'}></Navbar> */}
          <Main/>
          <NextScript/>
      </body>
    </Html>
  )
}