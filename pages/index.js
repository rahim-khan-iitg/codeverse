import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import HomePage from './components/Home/HomePage'
export default function Home() {
  return (
    <main>
      <HomePage/>
    </main>
  )
}
