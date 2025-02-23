import { RefObject, useCallback, useState } from 'react'
import { calculateISOStringToRealDate } from '../model/calculateISOStringHandlers'

export const useCalculateISOString = (
  isoStringInputRef: RefObject<HTMLInputElement>,
  timeZoneRef: RefObject<HTMLSelectElement>
) => {
  const [date, setDate] = useState<string | null>(null)

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
      alert('No timeZone selected')
      timeZoneEl?.focus()
      return
    }

    const realDate = calculateISOStringToRealDate(dateString, timeZone)
    setDate(realDate)
  }, [])

  return {
    date,
    handleCalcClick
  }
}
