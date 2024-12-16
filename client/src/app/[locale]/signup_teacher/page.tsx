'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '../../hooks/store'
import { failPopUp, successPopUp } from '../../hooks/features/popup.slice'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import RImage from '@/src/app/assets/RImage.png'
import SignUpImage from '@/src/app/assets/Sign_up_Image.png'
import BGImage from '@/src/app/assets/login_bg.svg'
import Link from 'next/link'
import { toast } from 'sonner'
import Flag_EN from '@/src/app/assets/england.png'
import Flag_VI from '@/src/app/assets/vietnam.png'
import http from '../../utils/http'
import { AuthenticationType } from '../../types/authentication.type'

export default function SignUpTeacherPage() {
  const t = useTranslations('sign_up_teacher')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [job_title, setJobTitle] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_confirmation, setRePassword] = useState<string>('')

  useEffect(() => {
    document.title = t('title')
  }, [t])

  useEffect(() => {
    const token = getCookie('authToken')
    if (token) {
      const role = getCookie('role')
      switch (role) {
        case 'admin':
          router.push('/admin')
          break
        case 'teacher':
          router.push('/teacher')
          break
        case 'user':
          router.push('/')
          break
      }
    }
  }, [router])

  const handleLoginSuccess = (response: { message: AuthenticationType }) => {
    const token = response.message.jwt
    const role = response.message.roles
    setCookie('authToken', token)
    setCookie('role', role)
    dispatch(successPopUp(t('login_successful')))
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'teacher') {
      router.push('/teacher')
    } else {
      router.push('/')
    }
  }

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await http.post('instructor/accounts', {
        account: { email, password, password_confirmation },
        teacher: { name: fullName, experience, job_title }
      })
      dispatch(successPopUp(t('check_mail')))
    } catch {
      dispatch(failPopUp(t('register_failed')))
    }
  }

  return (
    <div className='fixed w-full'>
      <Image className='-z-50' src={BGImage.src} layout='fill' objectFit='cover' alt='Background' />
      <div className='flex flex-row h-dvh z-0'>
        <div className='flex flex-col basis-1/2 justify-end ml-36'>
          <Link href='/'>
            <Image className='max-w-md mb-5' src={RImage.src} alt='img' width={200} height={200} />
          </Link>
          <p className='text-3xl font-bold w-[500px] mb-10'>{t('welcome_message')}</p>
          <Image className='max-w-md flex shrink' src={SignUpImage.src} alt='img' width={500} height={200} />
        </div>
        <div className='flex basis-1/2 items-center'>
          <Card className='w-[500px] p-6 max-h-[calc(100vh-100px)] overflow-y-scroll no-scrollbar'>
            <CardHeader>
              <CardTitle className='text-3xl'>{t('sign_up')}</CardTitle>
              <CardDescription>{t('sign_up_prompt')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='full_name' className='text-lg font-bold'>
                      {t('full_name')}
                    </Label>
                    <Input
                      id='text'
                      placeholder={t('full_name')}
                      onChange={(e) => {
                        setFullName(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email' className='text-lg font-bold'>
                      {t('email')}
                    </Label>
                    <Input
                      id='email'
                      placeholder={t('email')}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='job_title' className='text-lg font-bold'>
                      {t('job_title')}
                    </Label>
                    <Input
                      id='job_title'
                      placeholder={t('job_title')}
                      onChange={(e) => {
                        setJobTitle(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='experience' className='text-lg font-bold'>
                      {t('experience')}
                    </Label>
                    <Input
                      id='experience'
                      placeholder={t('experience')}
                      onChange={(e) => {
                        setExperience(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password' className='text-lg font-bold'>
                      {t('password')}
                    </Label>
                    <Input
                      id='password'
                      type='password'
                      placeholder={t('password')}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password' className='text-lg font-bold'>
                      {t('re_password')}
                    </Label>
                    <Input
                      id='re_password'
                      type='password'
                      placeholder={t('re_password')}
                      onChange={(e) => {
                        setRePassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex-col justify-center w-full'>
              <div className='flex flex-col items-center w-full'>
                <div className='mb-8'>
                  <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      handleRegister(e)
                      toast(t('processing'), {
                        description: t('processing_check'),
                        action: {
                          label: t('close'),
                          onClick: () => {}
                        }
                      })
                    }}
                  >
                    {t('sign_up')}
                  </Button>
                </div>
              </div>
              <div className='flex gap-3 mt-4'>
                <p>{t('have_account')}</p>
                <Link href='/login'>
                  <p className='font-bold text-primary'>{t('page_login')}</p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-2 content-end h-full gap-4 mr-5 pb-2 text-xl font-bold'>
          <Link href='/en/signup'>
            <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
          </Link>
          <Link href='/vi/signup'>
            <Image src={Flag_VI} alt='Flag EN' className='w-9 h-7' />
          </Link>
        </div>
      </div>
    </div>
  )
}
