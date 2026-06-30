export interface WeatherData {
  name: string
  weather: {
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  wind: {
    speed: number
    deg? : number // 풍향 (선택)
  }
  clouds: {
    all: number
  }
  visibility: number
  sys: {
    sunrise :number
    sunset :number
  }
  coord: {
    lat: number
    lon: number
  }
}

export interface ForecastItem {
  dt: number
  dt_txt: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
  pop: number  // 강수확률 (0~1)
  wind: {
    speed: number
    deg?: number  // 풍향 (선택)
  }
}

export interface ForecastData {
  list: ForecastItem[]
  city: {
    name: string
    country: string
    sunrise: number
    sunset: number
  }
}

export interface AirPollutionData {
  list: {
    main: {
      aqi: number  // 1~5
    }
    components: {
      pm2_5: number  // 초미세먼지
      pm10: number   // 미세먼지
      no2: number
      o3: number
    }
  }[]
}


export interface WeatherResponse {
  weather: WeatherData
  forecast: ForecastData
  air: AirPollutionData 
}