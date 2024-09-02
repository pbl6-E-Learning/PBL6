'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import TranslateForm from '@/src/components/TranslateForm'
import { useTranslations } from 'next-intl'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import Image from 'next/image'
import Img from '../../assets/trans_bg.png'
export default function TranslatePage() {
  const t = useTranslations('trans')
  useEffect(() => {
    document.title = t('title')
  }, [t])
  return (
    <div>
      <Navbar />
      <TranslateForm />
      <div className='fixed bottom-0 w-full flex justify-center z-[-1] mt-4'>
        <Image src={Img.src} alt='translate' width={1300} height={1500}></Image>
      </div>
    </div>
  )
}
