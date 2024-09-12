'use client'
import { RiComputerLine } from 'react-icons/ri'
import { CiMobile3 } from 'react-icons/ci'
import { TbWorldWww } from 'react-icons/tb'
import { IoMdHappy } from 'react-icons/io'
import { BiSupport } from 'react-icons/bi'
import { IoPulseOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const Services = () => {
  const t = useTranslations('services')

  const ServicesData = [
    {
      id: 1,
      title: t('webDevelopment'),
      link: '#',
      icon: <TbWorldWww />,
      delay: 0.2
    },
    {
      id: 2,
      title: t('mobileDevelopment'),
      link: '#',
      icon: <CiMobile3 />,
      delay: 0.3
    },
    {
      id: 3,
      title: t('softwareDevelopment'),
      link: '#',
      icon: <RiComputerLine />,
      delay: 0.4
    },
    {
      id: 4,
      title: t('satisfiedClients'),
      link: '#',
      icon: <IoMdHappy />,
      delay: 0.5
    },
    {
      id: 5,
      title: t('seoOptimization'),
      link: '#',
      icon: <IoPulseOutline />,
      delay: 0.6
    },
    {
      id: 6,
      title: t('support'),
      link: '#',
      icon: <BiSupport />,
      delay: 0.7
    }
  ]

  const SlideLeft = (delay: number) => {
    return {
      initial: {
        opacity: 0,
        x: 50
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          delay: delay,
          ease: 'easeInOut'
        }
      }
    }
  }

  return (
    <section className='bg-white dark:bg-dark dark:text-white'>
      <div className='container pb-14 pt-16'>
        <h1 className='text-4xl font-bold text-left pb-10'>{t('title')}</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8'>
          {ServicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={SlideLeft(service.delay)}
              initial='initial'
              whileInView={'animate'}
              viewport={{ once: true }}
              className='bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl dark:bg-dark dark:text-white'
            >
              <div className='text-4xl mb-4'> {service.icon}</div>
              <h1 className='text-lg font-semibold text-center px-3'>{service.title}</h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
