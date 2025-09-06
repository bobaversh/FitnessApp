import styles from './DeleteItem.module.css'

export default function DeleteItem({ onConfirm, itemType }) {
    const getMessage = () => {
      switch(itemType) {
        case 'workout': return 'Вы уверены, что хотите удалить тренировку?'
        case 'template': return 'Вы уверены, что хотите удалить шаблон?'
        default: return 'Вы уверены, что хотите удалить этот элемент?'
      }
    }
  
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p style={{color:'#ffffff'}}>{getMessage()}</p>
          <div className={styles.yesOrNoContainer}>
            <button className={styles.deleteButton} onClick={() => onConfirm(true)}>Да</button>
            <button className={styles.deleteButton} onClick={() => onConfirm(false)}>Нет</button>
          </div>
        </div>
      </div>
    )
  }
  