import styles from './BackButton.module.css'
import { SlActionUndo } from 'react-icons/sl'

export default function BackButton ({onClick}) {
    return (
        <>
            <button 
                className={styles.backButton}
                onClick={onClick}
            >
                <SlActionUndo  style = {{color: '#ffffff80', fontSize : '20px', margin: '5px'}}/>
            </button>
        </>
    )
}