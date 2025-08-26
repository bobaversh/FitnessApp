import styles from './BottomBar.module.css';
import { LuBicepsFlexed, LuApple } from "react-icons/lu";
import { LiaTapeSolid } from "react-icons/lia";

export default function BottomBar({ setActiveSection, activeSection }) {

  const items = [
    { id: '1', icon: LuBicepsFlexed, name: 'training' },
    { id: '2', icon: LuApple, name: 'food' },
    { id: '3', icon: LiaTapeSolid, name: 'tape' }
  ];

  return (
    <div className={styles.bottomBarContainer}>
      {items.map(item => (
        <div 
          key={item.id}
          className={styles[item.name]}
          onClick={() => setActiveSection(item.id)}
        >
          <item.icon 
            className={activeSection === item.id ? styles.active : styles.icon} 
          />
        </div>
      ))}
    </div>
  )
}