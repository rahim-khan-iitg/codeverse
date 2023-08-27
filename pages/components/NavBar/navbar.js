import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-8 bg-white shadow-md">
      <Link href="/" className="text-1xl font-bold text-gray-800">
        Brand
      </Link>
      <div className="flex">
        <Link href="/about" className="text-gray-600 px-4 hover:text-gray-800">
          About
        </Link>
        <Link href="/contact" className="text-gray-600 px-4 hover:text-gray-800">
        Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
