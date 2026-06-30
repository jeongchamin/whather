## whather

Seoul의 날씨를 확인할 수 있는 날씨 앱입니다.


## 주요기능

현재 날씨 조회 (기온, 체감온도, 습도, 풍속/풍향 , 대기질_AQI)
시간별 예보 (3시간 단위, 24시간)
5일간 주간 예보
일요일 날짜 강조 표시

## 기술스택

Framework: Next.js 15 (App Router)
Language: TypeScript
Styling: Tailwind CSS
Icons: lucide-react
API: OpenWeatherMap API (Current Weather, 5 Day Forecast, Air Pollution)

## 폴더구조

whather/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts        # 날씨/예보/대기질 API 통합 호출
│   └── page.tsx
├── components/
│   └── weather/
│       ├── CurrentWeather.tsx  # 현재 날씨 카드
│       ├── HourlyForecast.tsx  # 시간별 예보
│       └── WeeklyForecast.tsx  # 주간 예보
├── hooks/
│   └── useWeather.ts           # 날씨 데이터 페칭 커스텀 훅
└── types/
    └── weather.ts              # API 응답 타입 정의


## 환경변수

.env.local 파일에 아래 값을 추가해야 합니다.
OPENWEATHER_API_KEY=your_api_key_here


## 로컬실행

```bash
npm run dev
# or
npm install
```
