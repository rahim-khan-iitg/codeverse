import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700">
      <Link href="/" className="text-1xl font-bold flex px-3">
        <Image src="/logo.jpg" alt="logo" width={20} height={20} /> Codeverse
      </Link>
      <div className="flex">
        <Link href="/about" className="px-4 hover:text-gray-800">
          About
        </Link>
        <Link href="/contact" className="px-4 hover:text-gray-800">
        Contact
        </Link>
        <Link href="/auth/login" className="px-4 hover:text-gray-800">
        Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
