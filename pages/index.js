import { Inter } from 'next/font/google'
import Editor from './components/Editor/Codeeditor'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      {/* <Navbar></Navbar> */}
      <Editor></Editor>
    </main>
  )
}
