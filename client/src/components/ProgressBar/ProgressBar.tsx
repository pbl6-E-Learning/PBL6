'use client'
import { Progress } from '../ui/progress'
import Image from 'next/image'
import imageUrl from '../../app/assets/loadpage.png'
import Nodata from '../Nodata/Nodata'
import { useEffect, useState } from 'react'

export function ProgressBar({ onComplete, isComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showNodata, setShowNodata] = useState(false)

  useEffect(() => {
    let loadingProgress = 0
    let increment = 10
    let initialSpeed = 100
    let decreaseSpeedAfter = 5000

    const interval = setInterval(() => {
      loadingProgress += increment
      setProgress(Math.min(loadingProgress, 100))

      if (loadingProgress >= 100) {
        clearInterval(interval)
        setIsVisible(false)
        setShowNodata(true)
        onComplete()
      }

      if (Date.now() - startTime > decreaseSpeedAfter) {
        increment = Math.max(0.5, increment * 0.9)
      }

      if (isComplete) {
        loadingProgress = 80
      }
    }, initialSpeed)

    const startTime = Date.now()
    return () => clearInterval(interval)
  }, [onComplete, isComplete])

  return (
    <>
      {showNodata ? (
        <Nodata />
      ) : (
        isVisible && (
          <div className='flex flex-col items-center justify-center w-full'>
            <Image src={imageUrl.src} alt='Loading Image' height={250} width={250} className='mb-4 object-cover' />
            <Progress value={progress} className='w-96' />
          </div>
        )
      )}
    </>
  )
}
