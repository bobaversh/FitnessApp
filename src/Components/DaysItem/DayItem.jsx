import { weeksArray } from './utils'
import styles from './DayItem.module.css'
import { useEffect, useState } from 'react'
import { getWorkoutsByDate } from '../../Server/trainingService'

function DayItem({day, setActiveDay, activeDay }) {

    const [dayClicked, setDayClicked] = useState ('')
    const [hasData, setHasData] = useState([])
    
    function actionDay () {
        setActiveDay(day)
        setDayClicked(`${day.getDate()} ${day.getMonth()+1} ${day.getFullYear()}`)
    }

    const loadWorkouts = () => {
      const dateStr = `${day.getDate()} ${day.getMonth() + 1} ${day.getFullYear()}`
      const workoutsForDate = getWorkoutsByDate(dateStr)
      setHasData(workoutsForDate && workoutsForDate.length > 0)
  }

  useEffect(() => {
      loadWorkouts()
  }, [day]) 

    return (
        <div 
          onClick={actionDay}
          className={`
            ${styles.day} 
            ${day == activeDay ? styles.active : ''}
            ${hasData ? styles.hasData : ''} 
          `}
        >
          <p className={styles.dayWeek}>{weeksArray[day.getDay()]}</p>
          <h3 className={styles.day_month}>{day.getDate()}</h3>
        </div>
      );
    }
    
    export default DayItem