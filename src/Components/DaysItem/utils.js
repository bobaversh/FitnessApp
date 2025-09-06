export const weeksArray = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


export function createArrayWeek(date) {

    date.setDate(date.getDate() - date.getDay() + (date.getDay() ==  0 ? -6 : 1));
    
    const arr = [];

    for(let i = 0; i < 7; i++) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + i)
        arr.push(newDate);
    }

    return arr;
}

export function createArrayMonth(date) {

    date.setDate(date.getDate() - date.getDay() + 1);

    const month = []

    for(let i = 0; i < 7; i++) {
        const newDateMonth = new Date(date)
        newDateMonth.setDate(newDateMonth.getMonth() + i);
        month.push(newDateMonth)
    }

    return month;
}