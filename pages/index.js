import Image from 'next/image'
import { Inter } from 'next/font/google'
import Editor from './components/Editor/Codeeditor'
import Navbar from './components/NavBar/navbar'
import Example from './components/examples/example'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <Editor></Editor>
    </main>
  )
}
