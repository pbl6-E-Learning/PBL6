'use client'
import { useAppDispatch } from '@/src/app/hooks/store'
import { Pagy } from '@/src/app/types/pagy.type'
import { User } from '@/src/app/types/user.type'
import http from '@/src/app/utils/http'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/src/components/ui/pagination'
import UserTable from '@/src/components/UserTable'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select'
import { failPopUp, successPopUp } from '@/src/app/hooks/features/popup.slice'

const ListUsers = () => {
  const t = useTranslations('list_users')
  const [users, setUsers] = useState<User[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = t('title')
  }, [t])

  useEffect(() => {
    if (searchTriggered) {
      const getListUsers = async () => {
        try {
          const queryParam = filterStatus === 'all' ? '' : filterStatus
          const res: { data: { message: { users: User[]; pagy: Pagy } } } = await http.get(
            `admin/users?page=${currentPage}&q[full_name_or_account_email_cont]=${searchTerm}&q[account_status_eq]=${filterStatus}`
          )
          setDataLoaded(true)
          setUsers(res.data.message.users)
          setTotalPages(res.data.message.pagy.pages ?? 1)
          setCurrentPage(res.data.message.pagy.current_page ?? 1)
        } catch (error: any) {
          setDataLoaded(true)
          const message = error?.response?.data?.error || error.message || t('error')
          dispatch(failPopUp(message))
        }
      }
      getListUsers()
      setSearchTriggered(false)
    }
  }, [currentPage, searchTriggered, dispatch, t, searchTerm, filterStatus])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setSearchTriggered(true)
    }
  }

  const handleBanActivate = async (user: User) => {
    try {
      const res: { message: string } = await http.patch(`/admin/accounts/${user.account_id}/update_status`)
      dispatch(successPopUp(res.message))
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.account_id === user.account_id
            ? { ...u, account: { ...u.account, status: u.account?.status === 'active' ? 'ban' : 'active' } }
            : u
        )
      )
    } catch (error: any) {
      const message = error?.response?.data?.error || error.message || t('update_fail')
      dispatch(failPopUp(message))
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    setSearchTriggered(true)
  }

  return (
    <div className='h-full'>
      <div className='flex mb-4 ml-5'>
        <Input
          type='text'
          placeholder={t('searchNameOrEmail')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mr-2 w-72 p-[19px]'
        />
        <Select
          onValueChange={(e: string) => {
            setFilterStatus(e)
          }}
        >
          <SelectTrigger className='w-36 mr-2'>
            <SelectValue placeholder={t('filterStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('status')}</SelectLabel>
              <SelectItem value='all'>{t('allStatus')}</SelectItem>
              <SelectItem value='0'>{t('active')}</SelectItem>
              <SelectItem value='1'>{t('ban')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} className='border p-[19px] text-white'>
          {t('search')}
        </Button>
      </div>
      <UserTable users={users} dataLoaded={dataLoaded} handleBanActivate={handleBanActivate} />
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href='#' onClick={() => handlePageChange(currentPage - 1)}>
                {t('previous')}
              </PaginationPrevious>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href='#'>{currentPage}</PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink href='#' onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href='#' onClick={() => handlePageChange(currentPage + 1)}>
                {t('next')}
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default ListUsers
