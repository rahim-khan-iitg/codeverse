import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px shadow-md text-gray-700">
      <Link href="/" className="text-1xl font-bold flex">
        <img src="/logo.jpg" alt="logo" width={30} height={30} /> Codeverse
      </Link>
      <div className="flex">
        <Link href="/about" className="px-4 hover:text-gray-800">
          About
        </Link>
        <Link href="/contact" className="px-4 hover:text-gray-800">
        Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
