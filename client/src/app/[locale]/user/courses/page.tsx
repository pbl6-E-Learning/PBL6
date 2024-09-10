'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo, Fragment } from 'react'
import { useTranslations } from 'next-intl'
import http from '../../../utils/http'
import moment from 'moment'
import { useAppDispatch } from '../../../hooks/store'
import { failPopUp } from '../../../hooks/features/popup.slice'
import { Course } from '../../../types/course'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import Image from 'next/image'
import { MdOutlinePlayLesson, MdSystemUpdateAlt } from 'react-icons/md'
import { PiChalkboardTeacher } from 'react-icons/pi'
import { LiaLevelUpAltSolid } from 'react-icons/lia'
import LessonImg from '../../../assets/lesson.png'
import { Separator } from '../../../../components/ui/separator'
import { Button } from '../../../../components/ui/button'
import { LessonScrollArea } from '../../../../components/LessonScrollArea/LessonScrollArea'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar'
import Nodata from '@/src/components/Nodata/Nodata'

const CourseDetail = () => {
  const t = useTranslations('show_course')
  const [course, setCourse] = useState<Course>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = useMemo(() => searchParams.get('id') || '', [searchParams])
  const dispatch = useAppDispatch()
  const [dataLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    document.title = t('title')
  })
  useEffect(() => {
    const getCourse = async (id: string | string[]) => {
      try {
        const res: { data: { message: { course: Course } } } = await http.get(`courses/${id}`)
        setCourse(res.data.message.course)
        setDataLoaded(true)
      } catch (error) {
        const message = error?.response?.data?.error || error.message || t('error')
        dispatch(failPopUp(message))
      }
    }
    getCourse(id)
  }, [dispatch, t, id])

  if (!course) {
    return (
      <div className='w-full flex items-center justify-center'>
        <ProgressBar
          onComplete={() => {
            if (dataLoaded) {
              setDataLoaded(true)
            }
          }}
          isComplete={!course}
          NoDataComponent={Nodata}
        />
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 mx-auto max-w-7xl px-4 lg:px-8 mt-5'>
        <div className='lg:flex-1'>
          <div className='lg:ml-20'>
            <h1 className='text-3xl font-extrabold mb-6'>{course.title}</h1>
            <p className=' text-gray-600 leading-relaxed'>
              {course.description.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
            <div className='flex justify-center w-full my-4'>
              <div className='flex flex-row gap-2 content-center'>
                <Image src={LessonImg.src} height={40} width={40} alt='lesson icon' />
                <span className='font-semibold py-3'>{t('list_lessons')}</span>
              </div>
            </div>
            <div>
              <LessonScrollArea lessons={course?.lessons} />
            </div>
          </div>
        </div>

        <div className='lg:flex-none lg:w-[400px] pt-10'>
          <Card className='w-full shadow-lg rounded-lg sticky top-20'>
            <CardHeader className='p-0'>
              <Image className='rounded-t-lg' src={course.image_url} height={400} width={400} alt='course image' />
            </CardHeader>
            <CardContent className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                  <MdOutlinePlayLesson size={24} className='text-primary' />
                  <span className='text-lg font-medium'>{t('lesson')}</span>
                </div>
                <span className='text-lg font-bold'>
                  {course.lessons.length} {t('lesson')}
                </span>
              </div>
              <Separator className='my-4' />
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                  <PiChalkboardTeacher size={24} className='text-primary' />
                  <span className='text-lg font-medium'>{t('teacher')}</span>
                </div>
                <span className='text-lg font-bold'>{course.teacher.name}</span>
              </div>
              <Separator className='my-4' />
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                  <LiaLevelUpAltSolid size={24} className='text-primary' />
                  <span className='text-lg font-medium'>{t('level')}</span>
                </div>
                <span className='text-lg font-bold'>{course.level}</span>
              </div>
              <Separator className='my-4' />
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <MdSystemUpdateAlt size={24} className='text-primary' />
                  <span className='text-lg font-medium'>{t('update')}</span>
                </div>
                <span className='text-lg font-bold'>{moment(course.updated_at).format('D MMMM YYYY')}</span>
              </div>
            </CardContent>
            <CardFooter className='px-6'>
              <Button className='w-full py-3 text-lg font-semibold rounded'>{t('enroll')}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
