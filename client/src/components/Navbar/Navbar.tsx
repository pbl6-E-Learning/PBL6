'use client'
import { IoMdMenu } from 'react-icons/io'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ModeToggle } from '../ModeToggle/ModeToggle'
import Link from 'next/link'
import Flag_EN from '@/src/app/assets/england.png'
import Flag_VI from '@/src/app/assets/vietnam.png'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { switchLanguage } from '@/src/app/utils/switchLanguage'

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('navbar')

  const queryString = searchParams.toString()

  return (
    <nav className='relative z-20'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className='container py-10 flex justify-between items-center'
      >
        <div>
          <Link href='/' className='font-bold text-4xl cursor-pointer'>
            Return
          </Link>
        </div>
        <div className='hidden lg:block'>
          <ul className='flex items-center gap-3'>
            {NavbarMenu?.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={`${menu.path}`}
                  className='inline-block py-2 px-3 hover:text-secondary relative group dark:text-dark'
                >
                  <div className='w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden cursor-pointer'></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            <Link href={switchLanguage('en', pathname, queryString)}>
              <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
            </Link>
            <Link href={switchLanguage('vi', pathname, queryString)}>
              <Image src={Flag_VI} alt='Flag VI' className='w-9 h-7' />
            </Link>
            <Button
              variant='outline'
              onClick={() => {
                router.push(`/signup`)
              }}
            >
              {t('button_sign_in')}
            </Button>
            <ModeToggle />
          </ul>
        </div>
        <div className='lg:hidden'>
          <IoMdMenu className='text-4xl' />
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar
