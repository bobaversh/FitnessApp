import styles from './DeleteTemplate.module.css'

export default function DeleteTemplate({ onConfirm }) {

  return (
    <div className={styles.overlay} onClick={() => onConfirm(false)}>
      <div 
        className={styles.deleteContainer} 
        onClick={e => e.stopPropagation()}
      >
        <p style = {{color:'#ffffff90'}}>Вы уверены, что хотите удалить данные?</p>
        <div className={styles.yesOrNoContainer}>
          <button className = {styles.deleteButton} onClick={() => onConfirm(true)}>Да</button>
          <button className = {styles.deleteButton} onClick={() => onConfirm(false)}>Нет</button>
        </div>
      </div>
    </div>
  );
}