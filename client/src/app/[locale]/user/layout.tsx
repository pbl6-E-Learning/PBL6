'use client'
import FooterMain from '@/src/components/FooterMain/FooterMain'
import Navbar from '@/src/components/Navbar/Navbar'
import { CategoriesProvider } from '../../context/CategoriesContext'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <CategoriesProvider>
        <div className='grid h-lvh grid-rows-[auto_1fr_auto]'>
          <Navbar />
          {children}
          <FooterMain />
        </div>
      </CategoriesProvider>
    </section>
  )
}
