import { role } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import home from '@/src/app/assets/home.png'
import teacher from '@/src/app/assets/teacher.png'
import student from '@/src/app/assets/student.png'
import level from '@/src/app/assets/class.png'
import lesson from '@/src/app/assets/levelMenu.png'
import profile from '@/src/app/assets/profile.png'
import setting from '@/src/app/assets/setting.png'
import logout from '@/src/app/assets/logout.png'
import calendar from '@/src/app/assets/calendar.png'

const menuItems = [
  {
    title: 'MENU',
    items: [
      {
        icon: home,
        label: 'Home',
        href: '/',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: teacher,
        label: 'Teachers',
        href: '/list/teachers',
        visible: ['admin', 'teacher']
      },
      {
        icon: student,
        label: 'Students',
        href: '/list/students',
        visible: ['admin', 'teacher']
      },
      {
        icon: level,
        label: 'Classes',
        href: '/list/classes',
        visible: ['admin', 'teacher']
      },
      {
        icon: lesson,
        label: 'Lessons',
        href: '/list/lessons',
        visible: ['admin', 'teacher']
      },
      {
        icon: calendar,
        label: 'Events',
        href: '/list/events',
        visible: ['admin', 'teacher', 'student', 'parent']
      }
    ]
  },
  {
    title: 'OTHER',
    items: [
      {
        icon: profile,
        label: 'Profile',
        href: '/profile',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: setting,
        label: 'Settings',
        href: '/settings',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: logout,
        label: 'Logout',
        href: '/logout',
        visible: ['admin', 'teacher', 'student', 'parent']
      }
    ]
  }
]

const Menu = () => {
  return (
    <div className='mt-4 text-sm dark:text-white'>
      {menuItems.map((i) => (
        <div className='flex flex-col gap-2' key={i.title}>
          <span className='hidden lg:block text-gray-400 font-light my-4'>{i.title}</span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight'
                >
                  <Image src={item.icon} alt='' width={20} height={20} />
                  <span className='hidden lg:block'>{item.label}</span>
                </Link>
              )
            }
          })}
        </div>
      ))}
    </div>
  )
}

export default Menu
