import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import ThemeToggler from '../Theme/ThemeToggler'
const Navbar = () => {
  const {data:session}=useSession();
  if(session)
  {
    return (
      <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700 dark:text-white dark:shadow-gray-700">
        <Link href="/" className="text-1xl font-bold flex">
          <Image src="/logo.jpg" alt="logo" width={20} height={20}/> Codeverse
        </Link>
        <div className="flex">
        <Link href="/" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
            Home
          </Link>
          <Link href="/auth/about" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
            About
          </Link>
          <Link href="/contact" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
          Contact
          </Link>
          <Link href='/auth/login' className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
          {/* {session.user.email} */}
          <img src={session.user.image} alt='image' className='w-8 rounded-2xl'></img>
          </Link>
          <div className='mr-2'>
          <ThemeToggler/>
          </div>
        </div>
      </nav>
    )
  }
  else
  {
    return (
      <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700 dark:text-white dark:shadow-gray-700">
        <Link href="/" className="text-1xl font-bold flex px-3">
          <Image src="/logo.jpg" alt="logo" width={20} height={20} /> Codeverse
        </Link>
        <div className="flex">
        <Link href="/" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
            Home
          </Link>
          <Link href="/auth/about" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
            About
          </Link>
          <Link href="/contact" className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
          Contact
          </Link>
          <Link href='/auth/login' className="px-4 hover:text-gray-800 dark:hover:text-gray-400">
              login
          </Link>
          <div className='mr-2'>
          <ThemeToggler/>
          </div>
        </div>
      </nav>
    )
  }
  
}

export default Navbar
