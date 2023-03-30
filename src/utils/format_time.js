import dayjs from 'dayjs'

// 1.格式化日期
export function formatMonthDay(date) {
  return dayjs(date).format('MM月DD日')
}

// 2.计算时间差
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day')
}
