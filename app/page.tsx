
'use client'

import { useWeather } from '@/hooks/useWeather' // 리모컨
import CurrentWeather from '@/components/weather/CurrentWeather' 
import HourlyForecast from '@/components/weather/HourlyForecast'
import WeeklyForecast from '@/components/weather/WeeklyForecast'

export default function Home() {
  const { data, loading, error } = useWeather('Seoul')

  if (loading) return <div className="text-white text-center mt-20">로딩 중...</div>
  if (error) return <div className="text-red-400 text-center mt-20">{error}</div>

  return (
    <main className="min-h-screen bg-[#181818] p-[20px] relative overflow-hidden">
      <img 
        src="/moon.png" 
        alt="" 
        className="moon-img animate-spin-slow pointer-events-none absolute"
      />
      
      <div className="max-w-md mx-auto flex flex-col relative md:border-2 border-[#333333] md:p-5 rounded-4xl">
        {data && <CurrentWeather data={data.weather} air={data.air} forecast={data.forecast}/>}
        {data && <HourlyForecast list={data.forecast.list} />}
        {data && <WeeklyForecast list={data.forecast.list} />}
      </div>
    </main>
  )
}