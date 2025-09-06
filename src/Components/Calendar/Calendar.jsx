import React, { useState } from 'react'
import DayItem from '../DaysItem/DayItem'
import styles from './Calendar.module.css'
import { createArrayWeek} from '../DaysItem/utils'
import { renderWeekMonthRange } from './utilsCalendar'

const CalendarNew = ({ setSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState(createArrayWeek(currentDate))
  const [activeDay, setActiveDay] = useState(null)

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
    setDays(createArrayWeek(newDate))
    setSelectDate(null)
  };

  const goToCurrentDay = () => {
    const today = new Date();
    setCurrentDate(today);
    setDays(createArrayWeek(today));
    setActiveDay(today);
    setSelectDate(null)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
    setDays(createArrayWeek(newDate))
    setSelectDate(null)
  }

  const handleDayClick = (day) => {
    setActiveDay(day)
    const dateStr = `${day.getDate()} ${day.getMonth() + 1} ${day.getFullYear()}`
    setSelectDate(dateStr)
  }

  return (
    <>
      <div className={styles.header}>
        <h2>{renderWeekMonthRange(days)}</h2>
      </div>
      
      <div className={styles.buttons}>
        <button className={styles.button} onClick={goToPreviousWeek}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
        <button className={styles.button} onClick={goToCurrentDay}>Сегодня</button>
        <button className={styles.button} onClick={goToNextWeek} ><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
      </div>

      <div className={styles.containers}>
        {days.map((day, index) => {
          return (
            <DayItem 
              key={index}
              day={day} 
              activeDay={activeDay}
              setActiveDay={handleDayClick}
            />
          );
        })}
      </div>
    </>
  )
}

export default CalendarNew