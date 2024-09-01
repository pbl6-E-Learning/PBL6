'use client'
import { IoMdMenu } from 'react-icons/io'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Flag_EN from '@/src/app/assets/england.png'
import Flag_VI from '@/src/app/assets/vietnam.png'
import Image from 'next/image'

const NavbarMenu = [
  {
    id: 1,
    title: 'Home',
    path: '/'
  },
  {
    id: 2,
    title: 'Services',
    link: '#'
  },
  {
    id: 3,
    title: 'About Us',
    link: '#'
  }
]
const Navbar = () => {
  return (
    <nav className='relative z-20'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className='container py-10 flex justify-between items-center'
      >
        {/* Logo section */}
        <div>
          <h1 className='font-bold text-2xl'>The Coding Journey</h1>
        </div>
        {/* Menu section */}
        <div className='hidden lg:block'>
          <ul className='flex items-center gap-3'>
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a href={menu.path} className='inline-block py-2 px-3 hover:text-secondary relative group'>
                  <div className='w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden'></div>
                  {menu.title}
                </a>
              </li>
            ))}
            <Link href='/en'>
              <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
            </Link>
            <Link href='/vi'>
              <Image src={Flag_VI} alt='Flag EN' className='w-9 h-7' />
            </Link>
            <button className='primary-btn'>Sign In</button>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className='lg:hidden'>
          <IoMdMenu className='text-4xl' />
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar
