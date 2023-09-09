import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const Navbar = () => {
  const {data:session}=useSession();
  if(session)
  {
    return (
      <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700">
        <Link href="/" className="text-1xl font-bold flex px-3">
          <Image src="/logo.jpg" alt="logo" width={20} height={20} /> Codeverse
        </Link>
        <div className="flex">
        <Link href="/" className="px-4 hover:text-gray-800">
            Home
          </Link>
          <Link href="/auth/about" className="px-4 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="px-4 hover:text-gray-800">
          Contact
          </Link>
          <Link href='/auth/login' className="px-4 hover:text-gray-800">
          {session.user.email}
          </Link>
        </div>
      </nav>
    )
  }
  else
  {
    return (
      <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700">
        <Link href="/" className="text-1xl font-bold flex px-3">
          <Image src="/logo.jpg" alt="logo" width={20} height={20} /> Codeverse
        </Link>
        <div className="flex">
        <Link href="/" className="px-4 hover:text-gray-800">
            Home
          </Link>
          <Link href="/auth/about" className="px-4 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="px-4 hover:text-gray-800">
          Contact
          </Link>
          <Link href='/auth/login' className="px-4 hover:text-gray-800">
              login
          </Link>
        </div>
      </nav>
    )
  }
  
}

export default Navbar
