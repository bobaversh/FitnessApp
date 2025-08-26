import styles from './FoodCalendar.module.css'
import React, { useState } from 'react'
import DayItem from '../../Training/Calendar/DaysItem/DayItem'
import { createArrayWeek } from '../../Training/Calendar/DaysItem/utils'
import { getFoodDataForDate } from './foodService'
import FoodInput from '../FoodInput/FoodInput'

export default function FoodCalendar () {

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
  
    const hasFoodOnDate = (date) => {
      const dateStr = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
      const foods = getFoodDataForDate(dateStr);
      return foods && foods.length > 0;
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
            const hasFood = hasFoodOnDate(day)
            return (
              <DayItem 
                key={index}
                day={day} 
                activeDay={activeDay}
                setActiveDay={(day) => {
                  setActiveDay(day);
                  setSelectedDate(`${day.getDate()} ${day.getMonth() + 1} ${day.getFullYear()}`)
                }}
                hasData={hasFood}
              />
            );
          })}
        </div>
          {selectedDate && <FoodInput selectedDate = {selectedDate} />}
      </>
    )
  }