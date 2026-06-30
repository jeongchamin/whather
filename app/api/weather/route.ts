import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city') || 'Seoul'

  const [weatherRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`),
    fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`),
  ])

  const weather = await weatherRes.json()
  const forecast = await forecastRes.json()

  const { lat, lon } = weather.coord
  const airRes = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  const air = await airRes.json()

  return NextResponse.json({ weather, forecast, air })
}