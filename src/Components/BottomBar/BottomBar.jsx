import styles from './BottomBar.module.css';
import { LuBicepsFlexed, LuApple } from "react-icons/lu";
import { LiaTapeSolid } from "react-icons/lia";
import { NavLink } from 'react-router';

export default function BottomBar() {

  return (
    <div className={styles.bottomBarContainer}>
        <NavLink to='/training'><LuBicepsFlexed className={styles.icon} /></NavLink>
        <NavLink to='/food'><LuApple className={styles.icon} /></NavLink>
        <NavLink to='/food'><LiaTapeSolid className={styles.icon} /></NavLink>
    </div>
  )
}