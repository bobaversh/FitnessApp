export function getMonthName(date) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const monthIndex = date.getMonth();
    return months[monthIndex];
  }

export const renderWeekMonthRange = (days) => {
    if (days.length < 7) return null;
    
    const firstDay = days[0];
    const lastDay = days[6];
    
    const firstMonth = firstDay.getMonth()
    const lastMonth = lastDay.getMonth()
    
    if (firstMonth == lastMonth) {
      return getMonthName(firstDay)
    }
  
    return `${getMonthName(firstDay)} - ${getMonthName(lastDay).toLowerCase()}`
  }