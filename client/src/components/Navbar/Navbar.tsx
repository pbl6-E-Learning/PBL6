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
import { useEffect, useState } from 'react'
import { getCookie, hasCookie } from 'cookies-next'
import { Profile } from '@/src/app/types/profile.type'
import { useAppDispatch } from '@/src/app/hooks/store'
import { failPopUp } from '@/src/app/hooks/features/popup.slice'
import http from '@/src/app/utils/http'
import { Avatar, AvatarImage } from '../ui/avatar'
import avtDefault from '@/src/app/assets/avtDefault.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

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
  const [token, setToken] = useState<string>('')
  const [profile, setProfile] = useState<Profile>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (hasCookie('authToken')) {
      setToken(getCookie('authToken'))
      return
    }
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res: { data: { message: Profile } } = await http.get(`users/profile`)
        setProfile(res.data.message)
      } catch (error) {
        const message = error?.response?.data?.error || error.message || t('error')
        dispatch(failPopUp(message))
      }
    }
    fetchProfile()
  }, [dispatch, t])

  const queryString = searchParams.toString()

  return (
    <nav className='relative z-20'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className='container pt-10 flex justify-between items-center'
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
            <ModeToggle />
            <Link href={switchLanguage('en', pathname, queryString)}>
              <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
            </Link>
            <Link href={switchLanguage('vi', pathname, queryString)}>
              <Image src={Flag_VI} alt='Flag VI' className='w-9 h-7' />
            </Link>
            {token ? (
              <Avatar>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger>
                    <AvatarImage src={profile?.profile?.image_url ? profile?.profile?.image_url : avtDefault.src} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{t('my_account')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleNavigation('profile')}>{t('profile')}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation('mycourses')}>{t('my_course')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Avatar>
            ) : (
              <Button
                variant='outline'
                onClick={() => {
                  router.push(`/signup`)
                }}
              >
                {t('button_sign_in')}
              </Button>
            )}
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
