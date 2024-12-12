'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import avatar from '@/src/app/assets/avatar.png'
import ModeToggle from '../ModeToggle/ModeToggle'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { switchLanguage } from '@/src/app/utils/switchLanguage'
import Flag_EN from '@/src/app/assets/england.png'
import Flag_VI from '@/src/app/assets/vietnam.png'
import { Fragment, useEffect, useState } from 'react'
import { CookieValueTypes, getCookie, hasCookie } from 'cookies-next'
import { Teacher } from '@/src/app/types/teacher.type'
import http from '@/src/app/utils/http'
import { ProfileResponse } from '@/src/app/types/profileRespone.type'
import { useAppDispatch } from '@/src/app/hooks/store'
import { failPopUp } from '@/src/app/hooks/features/popup.slice'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const NavbarAdmin = () => {
  const t = useTranslations('navbar_teacher')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const [role, setRole] = useState<CookieValueTypes>()
  const [token, setToken] = useState<CookieValueTypes>()
  const [profile, setProfile] = useState<Teacher>()
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getCookie('authToken')
    if (!token) {
      router.push('/login')
      dispatch(failPopUp(t('no_token_message')))
      return
    }
  }, [dispatch, router, t])

  useEffect(() => {
    if (hasCookie('authToken')) {
      setToken(getCookie('authToken'))
      return
    }
  }, [])

  useEffect(() => {
    if (hasCookie('role')) {
      setRole(getCookie('role'))
      return
    }
  }, [])

  useEffect(() => {
    if (hasCookie('authToken') && role === 'teacher') {
      const fetchProfile = async () => {
        try {
          const res: ProfileResponse = await http.get(`instructor/teachers/profile`)
          setProfile(res.data.message.profile)
        } catch (error: any) {
          const message = error?.response?.data?.error || error.message || t('error')
          dispatch(failPopUp(message))
        }
      }
      fetchProfile()
    }
    return
  }, [dispatch, t, role])

  return (
    <div className='flex items-center justify-between p-4 dark:bg-dark dark:text-white'>
      <div className='flex items-center gap-6 justify-end w-full'>
        <ModeToggle />
        <Link href={switchLanguage('en', pathname, queryString)}>
          <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
        </Link>
        <Link href={switchLanguage('vi', pathname, queryString)}>
          <Image src={Flag_VI} alt='Flag VI' className='w-9 h-7' />
        </Link>

        {token ? (
          <Fragment>
            {role === 'teacher' ? (
              <div className='flex'>
                <div className='flex flex-col mr-3'>
                  <span className='text-xs font-medium'>{profile?.name}</span>
                  <span className='w-full text-[10px] text-gray-500 text-right'>{profile?.job_title}</span>
                </div>
                <Avatar>
                  <AvatarImage src={profile?.image_url ? profile?.image_url : avatar.src} />
                </Avatar>
              </div>
            ) : (
              <div className='flex items-center'>
                <span className='text-xs font-medium  mr-3'>{t('admin')}</span>
                <Avatar>
                  <AvatarImage src={avatar.src} />
                </Avatar>
              </div>
            )}
          </Fragment>
        ) : (
          <Button
            variant='outline'
            onClick={() => {
              router.push(`/login`)
            }}
          >
            {t('button_sign_in')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default NavbarAdmin
