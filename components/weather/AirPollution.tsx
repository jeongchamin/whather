// components/weather/AirPollution.tsx
'use client'

import { AirPollutionData } from '@/types/weather'

interface Props {
  data: AirPollutionData
}

function getAqiLabel(aqi: number): { label: string; color: string } {
  const map: Record<number, { label: string; color: string }> = {
    1: { label: '좋음', color: 'text-blue-300' },
    2: { label: '보통', color: 'text-green-300' },
    3: { label: '나쁨', color: 'text-yellow-300' },
    4: { label: '매우 나쁨', color: 'text-orange-300' },
    5: { label: '위험', color: 'text-red-400' },
  }
  return map[aqi] ?? { label: '알 수 없음', color: 'text-white/50' }
}

export default function AirPollution({ data }: Props) {
  const { aqi } = data.list[0].main
  const { pm2_5, pm10 } = data.list[0].components
  const { label, color } = getAqiLabel(aqi)

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 text-white">
      <p className="text-sm text-white/70 mb-4">대기질</p>
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-2xl font-bold ${color}`}>{label}</span>
        <span className="text-white/50 text-sm">AQI {aqi}</span>
      </div>
      <div className="flex gap-6">
        <div>
          <p className="text-xs text-white/50">초미세먼지 PM2.5</p>
          <p className="text-sm font-medium">{pm2_5.toFixed(1)} ㎍/㎥</p>
        </div>
        <div>
          <p className="text-xs text-white/50">미세먼지 PM10</p>
          <p className="text-sm font-medium">{pm10.toFixed(1)} ㎍/㎥</p>
        </div>
      </div>
    </div>
  )
}