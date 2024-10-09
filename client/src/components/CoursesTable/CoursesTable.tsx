import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { Badge } from '@/src/components/ui/badge'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Img from '@/src/app/assets/no_data.svg'
import { Skeleton } from '@/src/components/ui/skeleton'
import { Course } from '@/src/app/types/course.type'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/components/ui/alert-dialog'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid'
import avtDefault from '@/src/app/assets/avtDefault.png'
import { BsTrashFill } from 'react-icons/bs'

interface UserTableProps {
  courses: Course[]
  dataLoaded: boolean
}

const CoursesTable: React.FC<UserTableProps> = ({ courses, dataLoaded }) => {
  const t = useTranslations('courses_table')

  return (
    <div className='w-[98%] flex justify-center rounded-lg shadow-xl m-5'>
      <Table className='w-full max-w-6xl mx-8 my-3'>
        <TableHeader className='dark:bg-background'>
          <TableRow>
            <TableHead className='uppercase font-bold text-center'>#</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('title')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('accepted')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('pending')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('rejected')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('level')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('action')}</TableHead>
            <TableHead className='uppercase font-bold text-center'>{t('view_course')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!dataLoaded ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>
                  <Skeleton className='w-6 h-6 mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-24 h-6 mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-16 h-6 mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-16 h-6 mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-16 h-6 mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton className='w-16 h-6 mx-auto' />
                </TableCell>
              </TableRow>
            ))
          ) : courses?.length > 0 ? (
            courses.map((course, index) => (
              <TableRow key={course.id}>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell>{course?.title}</TableCell>
                <TableCell className='text-center'>{course?.assignments_count?.accepted}</TableCell>
                <TableCell className='text-center'>{course?.assignments_count?.pending}</TableCell>
                <TableCell className='text-center'>{course?.assignments_count?.rejected}</TableCell>
                <TableCell className='text-center'>
                  <Badge
                    className={
                      course?.level === 'N1'
                        ? 'bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer'
                        : course?.level === 'N2'
                          ? 'bg-purple-600 hover:bg-purple-700 rounded-full cursor-pointer'
                          : course?.level === 'N3'
                            ? 'bg-green-600 hover:bg-green-700 rounded-full cursor-pointer'
                            : course?.level === 'N4'
                              ? 'bg-yellow-600 hover:bg-yellow-700 rounded-full cursor-pointer'
                              : 'bg-gray-600 hover:bg-gray-700 rounded-full cursor-pointer'
                    }
                  >
                    {course?.level}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center cursor-pointer'>
                    <BsTrashFill color='red' size={25} />
                  </div>
                </TableCell>
                <TableCell className='cursor-pointer'>
                  <div className='flex justify-center'>
                    <AlertDialog>
                      <AlertDialogTrigger className='cursor-pointer'>
                        <DocumentMagnifyingGlassIcon className='w-6 h-6' />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t('view_details_course')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div className='flex space-x-4'>
                              <div>
                                <Image
                                  src={course?.image_url || avtDefault.src}
                                  alt={t('avatarAlt')}
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <div>
                                <p>
                                  <strong>{t('title')}:</strong> {course?.title}
                                </p>
                                <p>
                                  <strong>{t('category')}:</strong> {course?.category?.name}
                                </p>
                                <p>
                                  <strong>{t('teacher')}:</strong> {course?.teacher?.name}
                                </p>
                                <p>
                                  <strong>{t('createdAt')}:</strong>{' '}
                                  {course?.created_at
                                    ? new Date(course?.created_at).toISOString().split('T')[0]
                                    : 'N/A'}
                                </p>
                                <p>
                                  <strong>{t('updatedAt')}:</strong>{' '}
                                  {course?.updated_at
                                    ? new Date(course?.updated_at).toISOString().split('T')[0]
                                    : 'N/A'}
                                </p>
                                <p>
                                  <strong>{t('level')}:</strong> {course?.level}
                                </p>
                              </div>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>{t('cancel')}</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='text-center'>
                <div className='flex justify-center'>
                  <Image src={Img} alt='' width={500} height={500} className='mx-auto' />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CoursesTable
