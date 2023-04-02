import dayjs from 'dayjs'

// 1.格式化日期,默认是MM月DD日，如果需要其他格式，直接传进来即可
export function formatMonthDay(date, formatStr = 'MM月DD日') {
  return dayjs(date).format(formatStr)
}

// 2.计算时间差
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day')
}
