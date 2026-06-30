'use client'

import { ForecastItem } from '@/types/weather'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Props {
  list: ForecastItem[]
}

const weatherIconMap: Record<string, LucideIcon> = {
  Thunderstorm: CloudLightning,
  Drizzle: CloudDrizzle,
  Rain: CloudRain,
  Snow: CloudSnow,
  Mist: Wind,
  Fog: Wind,
  Clear: Sun,
  Clouds: Cloud,
}

const weatherLabel: Record<string, string> = {
  Thunderstorm: '천둥번개',
  Drizzle: '이슬비',
  Rain: '비',
  Snow: '눈',
  Mist: '안개',
  Fog: '짙은 안개',
  Clear: '맑음',
  Clouds: '흐림',
}

function getDailyForecast(list: ForecastItem[]) {
  const grouped: Record<string, ForecastItem[]> = {}

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0] 
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(item)
  })

  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp)
    const maxPop = Math.max(...items.map((i) => i.pop))
    const noon = items.find((i) => i.dt_txt.includes('12:00:00')) ?? items[0]

    return {
      date,
      tempMax: Math.round(Math.max(...temps)),
      tempMin: Math.round(Math.min(...temps)),
      pop: Math.round(maxPop * 100),
      icon: noon.weather[0].icon,
      main: noon.weather[0].main,
      description: weatherLabel[noon.weather[0].main] ?? noon.weather[0].description,
    }
  })
}

export default function WeeklyForecast({ list }: Props) {
  const daily = getDailyForecast(list)

  return (
    <div className="text-white p-[1px] bg-gradient-to-t from-[#333333] via-[#a2a2a2] to-[#333333] rounded-3xl">
      <div className="w-full h-full bg-[#181818] px-6 py-1 text-white rounded-3xl">
        <p className="pt-4 text-white font-thin">주간 예보</p>

        <div className="flex flex-col">
          {daily.map(({ date, tempMax, tempMin, icon, main, description }) => {
            const dateObj = new Date(date)
            const dayLabel = new Date(date).toLocaleDateString('ko-KR', { weekday: 'short' }) 
            const dateLabel = new Date(date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) 
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
            const isSunday = dateObj.getDay() === 0 // 0 = 일요일
            const WeatherIcon = weatherIconMap[main] ?? Cloud


            return (
              <div key={date} className="flex items-center justify-start gap-5 border-b border-[#363636] last:border-b-0 py-3">
                
                <WeatherIcon size={28} className="text-white/70" />

                <div className="w-full">
                  {/* 윗줄 */}
                  <div className='flex items-center justify-between gap-4'>
                    <p className='text-md font-normal'>{dayLabel}요일</p>
                    <div className="flex gap-3 text-sm">
                      <span className="text-[#75ADEE] font-medium text-md">{tempMin}°</span>
                      <em className="text-white/16 font-medium text-md">/</em> 
                      <span className="text-[#FFC700] font-medium text-md">{tempMax}°</span>
                    </div>
                  </div>

                  {/* 아랫줄 */}
                  <div  className='-mt-1'>
                    <span className={`text-xs ${isSunday ? 'text-[#DD3B3B]' : 'text-[#999999]'}`}>{dateLabel}</span>
                    <span className='text-[#999999] text-sm pl-3'>{description}</span>
                  </div>

                </div>
          
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}