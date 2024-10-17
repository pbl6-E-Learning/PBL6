import Image from 'next/image'
import Link from 'next/link'
import home from '@/src/app/assets/home.png'
import teacher from '@/src/app/assets/teacher.png'
import student from '@/src/app/assets/student.png'
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
        href: '/'
      },
      {
        icon: lesson,
        label: 'Courses',
        href: '/teacher/courses'
      },
      {
        icon: student,
        label: 'Lesson',
        href: '/teacher/users'
      },
      {
        icon: calendar,
        label: 'Request',
        href: '/teacher/request'
      }
    ]
  },
  {
    title: 'OTHER',
    items: [
      {
        icon: teacher,
        label: 'Profile',
        href: '/teacher/profile'
      },
      {
        icon: setting,
        label: 'Settings',
        href: '/settings'
      },
      {
        icon: logout,
        label: 'Logout',
        href: '/logout'
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
          })}
        </div>
      ))}
    </div>
  )
}

export default Menu
