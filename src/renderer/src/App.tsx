import { useCallback, useRef, useState } from 'react'
import { Input } from './shared/ui/Input'
import { Selectbox } from './shared/ui/Selectbox'
import { calculateISOStringToRealDate } from './features/calculate-ISOString/model/calculateISOStringHandlers'

// 2026-01-11T13:16:08.000Z
function App(): JSX.Element {
  const [date, setDate] = useState<string | null>(null)
  const isoStringInputRef = useRef<HTMLInputElement>(null)
  const timeZoneRef = useRef<HTMLSelectElement>(null)

  const handleCalcClick = useCallback(() => {
    const dateStringEl = isoStringInputRef.current
    const dateString = dateStringEl?.value
    if (!dateString || dateString.trim().length < 1) {
      alert('Empty ISO String!')
      dateStringEl?.focus()
      return
    }

    const timeZoneEl = timeZoneRef.current
    const timeZone = timeZoneEl?.value
    if (!timeZone || timeZone.length < 1) {
      alert('No timeZone Selected')
      timeZoneEl?.focus()
      return
    }

    const realDate = calculateISOStringToRealDate(dateString, timeZone)
    setDate(realDate)
  }, [])

  return (
    <>
      <Input ref={isoStringInputRef} type="text" labelLeadingComponent={'ISO string : '} />
      <Selectbox
        ref={timeZoneRef}
        labelLeadingComponent={'조회하고자 하는 지역 : '}
        placeholder="고르세욧"
      >
        <option value={'Asia/Seoul'}>한국</option>
        <option value={'America/New_York'}>뉴욕</option>
        <option value={'Europe/Paris'}>프랑스</option>
      </Selectbox>
      <button onClick={handleCalcClick}>변환</button>
      <br />
      <div className="result">
        <span>Date: </span>
        {date}
      </div>
    </>
  )
}

export default App
