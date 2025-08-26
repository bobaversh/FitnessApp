import styles from './TrenServer.module.css'
import { useState, useEffect } from 'react'
import { deleteWorkout, getWorkoutsByDate } from './trainingService'
import TrainingTemplates from './TrainingTemplates/TrainingTemplates'
import TrainingProcess from './TrainingTemplates/TrainingProcess'
import DeleteTemplate from './TrainingTemplates/DeleteTemplate'
import { FaTrash } from 'react-icons/fa'

export default function TrenServer({ selectedDate }) {
    const [showTemplates, setShowTemplates] = useState(false)
    const [workouts, setWorkouts] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [workoutToDelete, setWorkoutToDelete] = useState(null)

    const handleDeleteClick = (workoutId) => {
        setWorkoutToDelete(workoutId);
        setShowDeleteModal(true);
      }

      const handleConfirmDelete = (confirmed) => {
        if (confirmed && workoutToDelete) {
          try {
            deleteWorkout(workoutToDelete)
            loadWorkouts()
          } catch (error) {
            console.error("Ошибка удаления:", error)
          }
        }
        setShowDeleteModal(false)
        setWorkoutToDelete(null)
      }

    const loadWorkouts = () => {
        const workoutsForDate = getWorkoutsByDate(selectedDate) 
        setWorkouts(workoutsForDate || [])
    }

    const handleTemplateAdded = () => {
        setShowTemplates(false)
        loadWorkouts()
    }

    useEffect(() => {
        if (selectedDate) {
          setShowTemplates(false)
          setSelectedWorkout(null)
          loadWorkouts()
        }
      }, [selectedDate])

    const hasWorkouts = workouts.length > 0

    return (
        <>
{showDeleteModal && (
            <DeleteTemplate 
            onConfirm={handleConfirmDelete} 
        />
        )}

        <div className={styles.container}>
            {showTemplates ? (
        <TrainingTemplates selectDate={selectedDate} 
            onBack={handleTemplateAdded} />
        ) : selectedWorkout ? (
            <TrainingProcess 
        workout={selectedWorkout} 
        onBack={() => setSelectedWorkout(null)} 
        />
            ) : (
                <>
                    {hasWorkouts && (
                        <div>
                            {workouts.map(workout => (
                                <div 
                                    key={workout.id} 
                                    className={styles.workoutItem}
                                    onClick={() => setSelectedWorkout(workout)}
                                >
                                    {workout.name}
                                    <button 
                                        className={styles.buttonDeleteWorkout}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteClick(workout.id)}}
                                    >
                                        <FaTrash/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedDate && (
                        <div 
                            className={styles.addWorkout}
                            onClick={() => setShowTemplates(true)}
                        >
                            <i 
                                className="fa fa-plus-square" 
                                aria-hidden="true" 
                                style={{
                                    color: 'rgba(147, 88, 202, 0.2)', 
                                    fontSize: '30px'
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
        </> 
    )
}