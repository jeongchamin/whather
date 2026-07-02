'use client'

import { ForecastItem } from '@/types/weather'
import { ArrowBigUpDash, ArrowUpFromDot, MousePointer2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface Props {
  list: ForecastItem[]
}

function getValueColor(value: number, max: number): string {
  const ratio = Math.min(value / max, 1) // 0~1
  const r = Math.round(0x19 + (0x58 - 0x19) * (1 - ratio))
  const g = Math.round(0x84 + (0x58 - 0x84) * (1 - ratio))
  const b = Math.round(0xFF + (0x58 - 0xFF) * (1 - ratio))
  return `rgb(${r}, ${g}, ${b})`
}

export default function HourlyForecast({ list }: Props) {
  const hourly = list.slice(0, 8)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const checkScrollEnd = () => {
    const el = scrollRef.current
    if (!el) return
    // 약간의 오차 허용 (소수점 스크롤값 대응)
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    setIsAtEnd(atEnd)
  }

  useEffect(() => {
    checkScrollEnd() // 처음 렌더될 때 이미 끝까지 보이는 경우(컨텐츠가 짧을 때) 대비
  }, [hourly])


  return (
    <div className="text-white mt-16 mb-10">
      
      <div className='flex'>
        <div className="w-16 shrink-0 flex flex-col">
          <div className="h-9"></div>
          <div className="h-9"></div>
          <div className="h-9 text-[#999999] text-xs" role="rowheader">강수량 mm</div>
          <div className="h-9 text-[#999999] text-xs" role="rowheader">습도 %</div>
          <div className="h-9 text-[#999999] text-xs" role="rowheader">풍속 m/s</div>
          <div className="h-9 text-[#999999] text-xs" role="rowheader">풍향</div>
        </div>
        <div className='relative overflow-hidden'>
          <div 
            ref={scrollRef}
            onScroll={checkScrollEnd}
            className="overflow-x-auto flex scrollbar-hide">
            <div className="flex items-center">
              {hourly.map((item, index) => {
                const time = new Date(item.dt * 1000).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false, //오전 오후 제거
                })

                return (
                    <div key={item.dt} className="flex flex-col items-center min-w-[56px] relative ">
                      <span className="h-9 text-xs text-white/70">{time}</span>
                      <span className="h-9 text-sm font-medium">{Math.round(item.main.temp)}°</span>
                      <span className="h-9 text-sm" style={{ color: getValueColor(item.pop * 100, 100) }}>{Math.round(item.pop * 100)}</span>
                      <span className='h-9 text-sm' style={{color: getValueColor(item.main.humidity, 100)}}>{item.main.humidity}</span>
                      <span className='h-9 text-sm'>{Math.round(item.wind.speed)}</span>
                      <span className='h-9 text-sm font-thin'>
                        <MousePointer2 size={18} style={{transform:`rotate(${(item.wind.deg ?? 0) + 45}deg)`}}/>
                      </span>
                      {index !== hourly.length - 1 && (
                        <span className='absolute bottom-3 right-0 w-[1px] h-45 bg-[#333333]'></span>
                      )}
                      
                    </div>
                )
              })}
            </div>
          </div>

          <div className={`absolute right-0 top-0 w-10 h-full z-50 bg-gradient-to-l from-[#181818] to-transparent pointer-events-none transition-opacity duration-300 ${
              isAtEnd ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>


      </div>

    </div>
  )
}