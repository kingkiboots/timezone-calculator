import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { useCalculateISOString } from './features/calculate-ISOString/lib/useCalculateISOString'
import { Input } from './shared/ui/Input'
import { Selectbox } from './shared/ui/Selectbox'

/**
 * TODO
 * 1. select 선택하자마자 Date 바뀌게
 * 2. 타임존 가져오는 라이르버리 찾아보기. 각 국가의 언어로 보여주기
 * 3. 설정 모달 있어서 언어보여주는 거나 AM PM 12,24 시간 포매팅
 */
function App(): JSX.Element {
  const isoStringInputRef = useRef<HTMLInputElement>(null)
  const timeZoneRef = useRef<HTMLSelectElement>(null)
  const { date, handleCalcClick } = useCalculateISOString(isoStringInputRef, timeZoneRef)

  const [isConvertShow, setIsConvertShow] = useState<boolean>(false)

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>((evt) => {
    const { value } = evt.target

    setIsConvertShow(value.length > 0)
  }, [])

  return (
    <>
      <Input
        ref={isoStringInputRef}
        type="text"
        labelLeadingComponent={'ISO string : '}
        onChange={handleInputChange}
      />
      <Selectbox
        ref={timeZoneRef}
        labelLeadingComponent={'조회하고자 하는 지역 : '}
        onChange={handleCalcClick}
        placeholder="고르세욧"
      >
        <option value={'Asia/Seoul'}>한국</option>
        <option value={'America/New_York'}>뉴욕</option>
        <option value={'Europe/Paris'}>프랑스</option>
      </Selectbox>
      {isConvertShow ? <button onClick={handleCalcClick}>변환</button> : null}
      <div className="result">
        <span>Date: </span>
        {date}
      </div>
    </>
  )
}

export default App
