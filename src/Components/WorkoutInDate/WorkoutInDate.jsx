import PlusButton from "../PlusButton/PlusButton"
import styles from "./WorkoutInDate.module.css"
import { FaTrash } from "react-icons/fa"

export default function WorkoutInDate({ workouts, onDelete, setShowPage }) {
    return (
      <div className={styles.container}>
          <p style={{textAlign: 'center', color: 'var(--text-color-s)'}}>
            Тренировки в этот день
          </p>
          {workouts.map((workout) => (
              <div onClick={()=>{setShowPage({ page: 'trainingProcess', workout: workout })}} key={workout.id} className={styles.item}>
                  <p className={styles.workoutName}>{workout.name}</p>
                  <button
                  className={styles.deleteButton}
                      
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(workout.id)
                      }}
                  >
                      <FaTrash />
                  </button>
              </div>
          ))}
          <PlusButton onClick={()=>{setShowPage('template')}}/>
      </div>
    )
  }