import styles from './TrainingTemplates.module.css'
import { getTemplates, addWorkout, deleteTemplate } from '../trainingService'
import { useState, useEffect } from 'react'
import CreateTrainingTempates from './CreateTrainingTemplate'
import TrainingProcess from './TrainingProcess'
import { SlActionUndo } from "react-icons/sl"
import { FaTrash } from 'react-icons/fa'
import DeleteTemplate from './DeleteTemplate'

export default function TrainingTemplates({ selectDate, onBack }) {
  const [status, setStatus] = useState(false)
  const [templates, setTemplates] = useState([])
  const [train, setTrain] = useState(false)
  const [createdWorkout, setCreatedWorkout] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState(null)

  useEffect(() => {
    loadTemplates();
  }, [])

  const loadTemplates = () => {
    try {
      const loadedTemplates = getTemplates();
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTrainingStart = (templateId) => {
    try {
      const newWorkout = addWorkout(selectDate, templateId);
      setCreatedWorkout(newWorkout);
      setTrain(true)
      return newWorkout;
    } catch (error) {
      console.error("Ошибка создания:", error)
      throw error;
    }
  };

  const handleDeleteClick = (templateId) => {
    setTemplateToDelete(templateId);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = (confirmed) => {
    if (confirmed && templateToDelete) {
      try {
        deleteTemplate(templateToDelete)
        loadTemplates()
      } catch (error) {
        console.error("Ошибка удаления:", error)
      }
    }
    setShowDeleteModal(false)
    setTemplateToDelete(null)
  };

  const handleBackFromCreation = () => {
    setStatus(false)
    loadTemplates()
  };

  const handleBackFromTraining = () => {
    setTrain(false)
    onBack()
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteTemplate 
          onConfirm={handleConfirmDelete} 
        />
      )}

      {!train ? (
        !status ? (
          !templates.length ? (
            <div className={styles.container}>
              <button 
                className={styles.backButton}
                onClick={handleBackFromTraining}
              >
                <SlActionUndo style = {{color: 'rgb(255, 255, 255, 0.8)', fontSize : '20px', margin: '5px'}}/>
              </button>
              <div 
                className={styles.addWorkout}
                onClick={() => setStatus(true)}
              >
                <p style={{ color: 'rgb(255, 255, 255, 0.8)' }}>
                  Добавьте шаблоны тренировок
                </p>
              </div>
            </div>
          ) : (
            <div style={{ color: 'white' }}>
              <button 
                className={styles.backButton}
                onClick={handleBackFromTraining}
              >
                <SlActionUndo style = {{color: '#ffffff80', fontSize : '20px', margin: '5px'}}/>
              </button>
              
              {templates.map((template) => (
                <div key={template.id} className={styles.trenTemplates}>
                  <button 
                    className={styles.addFromTemplate}
                    onClick={() => handleTrainingStart(template.id)}
                  >
                    {template.name}
                  </button>
                  <button 
                    className={styles.buttonDeleteTemplate}
                    onClick={() => handleDeleteClick(template.id)}
                  >
                    <FaTrash/>
                  </button>
                </div>
              ))}
              
              <div 
                className={styles.addWorkout}
                onClick={() => setStatus(true)}
              >
                <i 
                  className="fa fa-plus-square" 
                  aria-hidden="true" 
                  style={{ color: 'rgba(147, 88, 202, 0.2)', fontSize: '30px' }}
                />
              </div>
            </div>
          )
        ) : (
          <CreateTrainingTempates
            onBack={handleBackFromCreation}
          />
        )
      ) : (
        <TrainingProcess 
          workout={createdWorkout} 
          onBack={handleBackFromTraining} 
        />
      )}
    </>
  )
}