'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const difference = midnight.getTime() - now.getTime()
      
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      
      setTimeLeft({ hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const pad = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="bg-accent text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 font-semibold text-sm sm:text-base">
          <Clock className="w-5 h-5" />
          <span>Offer ends tonight</span>
          <div className="flex items-center gap-1">
            <span className="bg-white/20 px-2 py-1 rounded">{pad(timeLeft.hours)}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{pad(timeLeft.minutes)}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{pad(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
