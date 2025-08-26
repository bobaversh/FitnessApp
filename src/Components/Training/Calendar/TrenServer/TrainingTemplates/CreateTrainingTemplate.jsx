import { useState } from "react";
import styles from './CreateTrainingTemplate.module.css'
import { FaPlusSquare, FaTrash } from 'react-icons/fa'
import { saveTemplate } from "../trainingService"
import { SlActionUndo } from "react-icons/sl"

const generateId = () => Math.random().toString(36).substr(2, 9)

export default function CreateTrainingTemplates( {onBack} ) {

  const [validationErrors, setValidationErrors] = useState({})
  const [template, setTemplate] = useState({
    name: '',
    exercises: [{
      name: '',
      number:'',
      id: generateId(),
      sets: [{ id: generateId(), weight: '', reps: '' }]
    }]
  })

  

  const addExercise = () => {
    setTemplate(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: '',
          number: '',
          id: generateId(),
          sets: [{ id: generateId(), weight: '', reps: '' }] 
        }
      ]
    }))
  }
  const removeExercise = () => {
    setTemplate(prev => {
      if (prev.exercises.length <= 1) {
        return prev
      }
      
      return {
        ...prev,
        exercises: prev.exercises.slice(0, -1)
      }
    })
  }

  const handleChangeNameOfTheTemplate = (event) => {
    setTemplate(prev => ({
      ...prev,
      name: event.target.value
    }))
  }

  const handleExerciseNumberChange = (exerciseId, value) => {
    setTemplate(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, number: value } : ex
      )
    }))
  }

  const handleExerciseNameChange = (exerciseId, value) => {
    setTemplate(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, name: value } : ex
      )
    }))
  }

  const savedTemplate = () =>{
    saveTemplate(template)
    setTemplate({
      name: '',
      exercises: [{
        name: '',
        number:'',
        id: generateId() ,
        sets: [{ id: generateId(), weight: '', reps: '' }]
      }]
    })
    onBack()
  }

  const validSetsCount = (set) => typeof set === 'number' && set >= 1 && set <= 20

  const handleChangeSets = (event, exerciseId) => {
    const setsValue = parseInt(event.target.value)
  
    if (!validSetsCount(setsValue)) {
      setValidationErrors(prev => ({
        ...prev,
        [exerciseId]: "Количество подходов от 1 до 20"
      }));
      return
    }
    
    setValidationErrors(prev => {
      const newErrors = {...prev}
      delete newErrors[exerciseId]
      return newErrors
    });
  
    setTemplate(prev => {
      const newSets = [];
      for (let i = 0; i < setsValue; i++) {
        newSets.push({
          id: generateId(),
          weight: '',
          reps: '',
        })
      }
      
      return {
        ...prev,
        exercises: prev.exercises.map(exercise => 
          exercise.id === exerciseId
            ? { ...exercise, sets: newSets }
            : exercise
        )
      }
    })
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.backButton}
        onClick={onBack}
      >
      <SlActionUndo  style = {{color: '#ffffff80', fontSize : '20px', margin: '5px'}}/>
      </button>
      <input 
      className={styles.nameOfTheTraining}
      onChange={handleChangeNameOfTheTemplate}
      value = {template.name}
      placeholder="Введите название тренировки"
      />
      {template.exercises.map((exercise) => (
        <div key = {exercise.id} className={styles.oneExercise}>
          <input 
          className={styles.numberOfExercise}
          placeholder="№"
          onChange={(e) => handleExerciseNumberChange(exercise.id, e.target.value)}
          />
          <div className={styles.exerciseContainer}>
            <input 
            className={styles.nameOfExercise} 
            placeholder="Введите название упражнения"
            onChange={(e) => handleExerciseNameChange(exercise.id, e.target.value)}
            />
          <input
            placeholder="Количество подходов"
            type="number"
            min="1"
            max="20"
            className={`${styles.sets} ${validationErrors[exercise.id] ? styles.inputError : ''}`}
            onChange={(e) => handleChangeSets(e, exercise.id)}
          />
          {validationErrors[exercise.id] && (
          <div className={styles.errorMessage}>
          {validationErrors[exercise.id]}
           </div>
          )}
          </div>
        </div>
      ))}
      <div className={styles.addRemove}>
        <FaPlusSquare onClick = {addExercise} style={{color:'#ffffff80', size:'40px'}}/>
        <FaTrash onClick = {removeExercise} style={{color:'#ffffff80', size:'40px'}}/>
      </div>
      {template.name.length == 0 ? (
        <button
      className={styles.saveButton}
      onClick = {savedTemplate}
      disabled
      >Сохранить тренировку
      </button>) : (<button
      className={styles.saveButton}
      onClick = {savedTemplate}
      >Сохранить тренировку
      </button>)}
    </div>
  )
}