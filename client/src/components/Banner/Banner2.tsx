'use client'
import BannerPng from '@/src/app/assets/banner.png'
import { motion } from 'framer-motion'

const Banner2: React.FC = () => {
  return (
    <section>
      <div className='container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0 dark:bg-dark dark:text-white'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className='flex flex-col justify-center'
        >
          <div className='text-center md:text-left space-y-4 lg:max-w-[450px] dark:bg-dark dark:text-white'>
            <h1 className='text-4xl font-bold !leading-snug'>Join Our Community to Start your Journey</h1>
            <p className='text-dark2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iusto minima ad ut id eos accusantium
              aut, aperiam quis incidunt!
            </p>
            <a href='https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0' className='primary-btn !mt-8'>
              Join Now
            </a>
          </div>
        </motion.div>
        <div className='flex justify-center items-center'>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng.src}
            alt='Banner'
            className='w-[550px] md:max-w-[650px] object-cover drop-shadow'
          />
        </div>
      </div>
    </section>
  )
}

export default Banner2
