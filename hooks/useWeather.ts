
import { useState, useEffect } from 'react'
import { WeatherResponse } from '@/types/weather'

export function useWeather(city: string = 'Seoul') {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/weather?city=${city}`)
        if (!res.ok) throw new Error('날씨 데이터를 불러오지 못했어요')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { data, loading, error }
}