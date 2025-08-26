import { useState } from 'react'
import './Header.css'
import SideBar from './Side bar/SideBar'

export default function Header () {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
        <>
        <div className = 'header_container'>
            <div className = 'header_start'>BVFss</div>
            <div className="header_cabinet">
                <i onClick={() => setIsSidebarOpen(!isSidebarOpen)}  className="fa fa-user-o" aria-hidden="true" style={{ fontSize: '30px', color: 'white', padding: '7px' }}></i>
            </div>
        </div>
        <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
        
    )
}