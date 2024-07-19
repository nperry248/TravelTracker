// app/utils/dateUtils.ts

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  export const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const startDay = start.getDate();
    const startMonth = monthNames[start.getMonth()];
    const startYear = start.getFullYear();
    const endDay = end.getDate();
    const endMonth = monthNames[end.getMonth()];
    const endYear = end.getFullYear();
  
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} - ${endDay}${getOrdinalSuffix(endDay)}, ${startYear}`;
      } else {
        return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)} - ${endMonth} ${endDay}${getOrdinalSuffix(endDay)}, ${startYear}`;
      }
    } else {
      return `${startMonth} ${startDay}${getOrdinalSuffix(startDay)}, ${startYear} - ${endMonth} ${endDay}${getOrdinalSuffix(endDay)}, ${endYear}`;
    }
  };
  