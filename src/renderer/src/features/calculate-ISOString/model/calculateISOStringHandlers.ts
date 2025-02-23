//NOTE - 계산하는 역할만. 돔 컨트롤은 안함
export const calculateISOStringToRealDate = (dateString: string, timeZone: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
    timeZone
  }).format(date)
}
