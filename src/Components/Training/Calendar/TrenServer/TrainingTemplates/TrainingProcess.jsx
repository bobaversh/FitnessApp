import React, { useState, useEffect } from 'react';
import styles from './TrainingProcess.module.css';
import { SlActionUndo } from "react-icons/sl";

export default function TrainingProcess({ workout: initialWorkout, onBack }) {
  const [workout, setWorkout] = useState(null);
  
  useEffect(() => {
    if (initialWorkout) {
      const workoutCopy = JSON.parse(JSON.stringify(initialWorkout));
      setWorkout(workoutCopy);
    }
  }, [initialWorkout]);

  const handleInputChange = (exIndex, setIndex, field, value) => {
    setWorkout(prev => {
      const newWorkout = JSON.parse(JSON.stringify(prev));
    
      newWorkout.exercises[exIndex].sets[setIndex][field] = value;
      
      return newWorkout;
    });
  };

  if (!workout) return <div>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        <SlActionUndo style={{color: '#ffffff80', fontSize: '20px', margin: '5px'}}/>
      </button>
      
      <div className={styles.nameOfTraining}>
        {workout.name}
      </div>
      
      <div className={styles.containerExercise}>
        {workout.exercises.map((ex, exIndex) => (
          <div key={ex.id} className={styles.exercise}>
            <div className={styles.exerciseHead}>
              <div className={styles.numberOfExercise}>{ex.number}</div>
              <div className={styles.nameOfExercise}>{ex.name}</div>
            </div>
            
            <div className={styles.exerciseBottom}>
              <div className={styles.weigthReps}>
                <p>Вес</p>
                <p>Повторения</p>
              </div>
              
              <div className={styles.setsContainer}>
                {ex.sets.map((set, setIndex) => (
                  <div key={set.id} className={styles.oneSet}>
                    <input 
                      className={styles.inputSet}
                      value={set.weight || ''}
                      onChange={e => handleInputChange(
                        exIndex, 
                        setIndex, 
                        'weight', 
                        e.target.value
                      )}
                    />
                    <input
                      className={styles.inputSet}
                      value={set.reps || ''}
                      onChange={e => handleInputChange(
                        exIndex, 
                        setIndex, 
                        'reps', 
                        e.target.value
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.exerciseDivider}></div>
          </div>
        ))}
      </div>
    </div>
  );
}