import './SideBar.css';

export default function SideBar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} className="sidebar-close-btn">×</button>
      <div className="sidebar-content">
        <a href="#">Профиль</a>
        <a href="#">Настройки</a>
        <a href="#">Выйти</a>
      </div>
    </div>
  );
}