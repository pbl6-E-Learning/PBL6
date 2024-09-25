'use client'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useState } from 'react'
import { Category } from '@/src/app/types/category.type'
import http from '@/src/app/utils/http'
import { useAppDispatch } from '@/src/app/hooks/store'
import { failPopUp } from '@/src/app/hooks/features/popup.slice'
import { TooltipProvider } from '../ui/tooltip'
import CourseCard from '../CourseCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import SkeletonCourse from '../SkeletonCourse/SkeletonCourse'

export default function ShowCourse() {
  const t = useTranslations('view_course')
  const [category, setCategory] = useState<Category[]>([])
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res: { data: { message: Category[] } } = await http.get(`categories`)
        setCategory(res.data.message)
        setLoading(false)
      } catch (error: any) {
        const message = error?.response?.data?.error || error.message || t('error')
        dispatch(failPopUp(message))
        setLoading(false)
      }
    }
    fetchProfile()
  }, [dispatch, t])

  return (
    <section className='bg-white dark:bg-dark dark:text-white'>
      {loading ? (
        <div className='flex gap-20 justify-center'>
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
          <SkeletonCourse />
        </div>
      ) : (
        <div>
          {category?.map((category, index) => (
            <div className='container pb-14' key={index}>
              <h1 className='text-4xl font-bold text-left pb-10'>{category?.name}</h1>
              <div className='flex flex-row w-full'>
                <TooltipProvider>
                  <Carousel className='w-full'>
                    <CarouselContent className='-ml-4 md:-ml-1'>
                      {category?.courses?.map((course) => (
                        <CarouselItem key={course?.id} className='pl-4 md:basis-1/2 lg:basis-1/4'>
                          <div className='p-1'>
                            <CourseCard course={course} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
