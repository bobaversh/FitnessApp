import styles from './Food.module.css'
import CalendarFood from './FoodCalendar/FoodCalendar'

export default function Food () {
    return (
        <div className={styles.containerFood}>
            <CalendarFood />
        </div>
    )
}