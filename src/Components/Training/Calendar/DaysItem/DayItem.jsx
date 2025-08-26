import { weeksArray } from './utils';
import styles from './DayItem.module.css';
import { useState } from 'react';

function DayItem({day, setActiveDay, activeDay, hasData}) {

    const [dayClicked, setDayClicked] = useState ('')
    
    function actionDay () {
        setActiveDay(day)
        setDayClicked(`${day.getDate()} ${day.getMonth()+1} ${day.getFullYear()}`)
    }
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
    
    export default DayItem;