import styles from "./Templates.module.css"
import PlusButton from "../PlusButton/PlusButton"
import { FaTrash } from "react-icons/fa"
import BackButton from "../BackButton/BackButton"
import { addWorkout } from "../../Server/trainingService"

export default function Templates({ templates, onDelete, date, setShowPage }) {

  const handleTemplateClick = (template) => {
    const newWorkout = addWorkout(date, template.id)
    setShowPage({ page: 'trainingProcess', workout: newWorkout })

  }
  return (
    <div className={styles.container}>
      <BackButton onClick={()=>{setShowPage('workout')}} />
      <p style={{ textAlign: "center", color: "var(--text-color-s)" }}>
        Ваши шаблоны тренировок
      </p>
      {templates.map((template) => (
        <div onClick = {() => handleTemplateClick(template)} key={template.id} className={styles.item}>
          <span className={styles.templateName}>{template.name}</span>
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(template.id)
            }}
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <PlusButton onClick={()=>{setShowPage('createTemplate')}} />
    </div>
  )
}
