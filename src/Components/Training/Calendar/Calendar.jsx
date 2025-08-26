import React, { useState } from 'react'
import DayItem from './DaysItem/DayItem'
import styles from './Calendar.module.css'
import { createArrayWeek} from './DaysItem/utils'
import TrenServer from './TrenServer/TrenServer'
import { getWorkoutsByDate } from './TrenServer/trainingService'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState(createArrayWeek(currentDate))
  const [activeDay, setActiveDay] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')

  function getMonthName(date) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const monthIndex = date.getMonth();
    return months[monthIndex];
  }


  const renderWeekMonthRange = () => {
    if (days.length < 7) return null;
    
    const firstDay = days[0];
    const lastDay = days[6];
    
    const firstMonth = firstDay.getMonth()
    const lastMonth = lastDay.getMonth()
    
    if (firstMonth === lastMonth) {
      return getMonthName(firstDay)
    }
  
    return `${getMonthName(firstDay)} - ${getMonthName(lastDay).toLowerCase()}`
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
    setDays(createArrayWeek(newDate))
    setSelectedDate('')
  };

  const goToCurrentDay = () => {
    const today = new Date();
    setCurrentDate(today);
    setDays(createArrayWeek(today));
    setActiveDay(today);
    setSelectedDate('')
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
    setDays(createArrayWeek(newDate))
    setSelectedDate('')
  }

  const hasWorkoutsOnDate = (date) => {
    const dateStr = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
    const workouts = getWorkoutsByDate(dateStr);
    return workouts && workouts.length > 0;
  }


  return (
    <>
      <div className={styles.header}>
        <h2>{renderWeekMonthRange()}</h2>
      </div>
      
      <div className={styles.buttons}>
        <button className={styles.button} onClick={goToPreviousWeek}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
        <button className={styles.button} onClick={goToCurrentDay}>Сегодня</button>
        <button className={styles.button} onClick={goToNextWeek} ><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
      </div>

      <div className={styles.containers}>
        {days.map((day, index) => {
          const hasWorkouts = hasWorkoutsOnDate(day)
          return (
            <DayItem 
              key={index}
              day={day} 
              activeDay={activeDay}
              setActiveDay={(day) => {
                setActiveDay(day);
                setSelectedDate(`${day.getDate()} ${day.getMonth() + 1} ${day.getFullYear()}`);
              }}
              hasData={hasWorkouts}
            />
          );
        })}
      </div>
      
      <TrenServer selectedDate={selectedDate} />
    </>
  );
};

export default Calendar;