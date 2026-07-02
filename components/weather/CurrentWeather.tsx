'use client'

import { WeatherData, AirPollutionData, ForecastData } from '@/types/weather'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface Props {
  data: WeatherData
  air : AirPollutionData
  forecast: ForecastData
}


function getWindDirection(deg: number): string {
  const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서']
  const index = Math.round(deg / 45) % 8
  return `${directions[index]}`
}

function getAqiLabel(aqi: number): { label: string; color: string } {
  const map: Record<number, { label: string; color: string }> = {
    1: { label: '좋음', color: 'text-[#75ADEE]' },
    2: { label: '보통', color: 'text-[#eeeeee]' },
    3: { label: '나쁨', color: 'text-[#946817]' },
    4: { label: '매우 나쁨', color: 'text-[#81137c]' },
    5: { label: '위험', color: 'text-[#520c0c]' },
  }
  return map[aqi] ?? { label: '알 수 없음', color: 'text-white/50' }
}

export default function CurrentWeather({ data, air, forecast }: Props) {
  const today = new Date().toISOString().slice(0, 10)
  const todayList = forecast.list.filter(item => item.dt_txt.startsWith(today))
  const todayMin = Math.round(Math.min(...todayList.map(item => item.main.temp_min)))
  const todayMax = Math.round(Math.max(...todayList.map(item => item.main.temp_max)))

  const { name:cityName, weather, main, wind } = data
  const { aqi } = air.list[0].main
  const { label, color } = getAqiLabel(aqi)

  const now = new Date()
  const dateLabel = now.toLocaleDateString('ko-KR', {
    month: 'long', 
    day: 'numeric',  
    weekday: 'long', 
  })

  return (
    <div className="text-white">
      <div>
        <p className="text-lg font-medium text-center text-[#181818]">{cityName}</p>
        <p className='text-sm font-normal text-[#181818] text-center'>{dateLabel}</p>
      </div>

      <div className="mt-30">
        <p className="text-md text-[#999999] text-center">{weather[0].description}</p>
        <p className="text-[100px] leading-[110px] text-center">{Math.round(main.temp)}°</p>
        <div className='flex items-center justify-center gap-6 text-[#CCCCCC] mt-2'>
          <div className='flex items-center justify-center gap-1'><ArrowUp size={16} className='text-[#8CC1D8]'/>{todayMin}</div>
          <div className='flex items-center justify-center gap-1'><ArrowDown size={16} className='text-[#FFC700]'/>{todayMax}</div>
        </div>
      </div>


      <div className="flex items-center justify-between mt-4 text-sm mt-16">
        <div className='text-center'>
          <span className='text-xs text-[#999999]'>습도</span>
          <div className='flex gap-1 justify-center items-end mt-2'>
            <strong className='text-2xl font-normal text-white'>{main.humidity}</strong>
            <em className='text-sm not-italic pb-1 text-white'>%</em>
          </div>
        </div>

        <div className='text-center'>
          <span className='text-xs text-[#999999]'>체감온도</span>
          <div className='flex gap-1 justify-center items-center mt-2'>
            <strong className='text-2xl font-normal text-white'>{Math.round(main.feels_like)}</strong>
            <em className='text-lg not-italic pb-1'>°</em>
          </div>
        </div>

        <div className='text-center'>
          <span className='text-xs text-[#999999]'>{getWindDirection(wind.deg ?? 0)}풍</span>
          <div className='flex gap-1 justify-center items-end mt-2'>
            <strong className='text-2xl font-normal text-white'>{Math.round(wind.speed)}</strong>
            <em className='text-md not-italic pb-1'>m/s</em>
          </div>
        </div>

        <div className='text-center'>
          <span className='text-xs text-[#999999]'>대기질</span>
          <div className='flex gap-1 justify-center items-end mt-2'>
            <strong className={`text-2xl font-normal font-bold ${color}`}>{label}</strong>
          </div>
        </div>

      </div>
    </div>
  )
}