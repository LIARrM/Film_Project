

import { Outlet, Link } from "react-router-dom";
import st from './style.module.css'

const Layout = () => {




    return <>
            <header>
                <nav className={st.menu}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="Registration">Registration</Link></li>
                        <li><Link to='AddFilm'>AddFilm</Link></li>
                        <li><Link to="Login">Login</Link></li>
                        <li><Link to="Profile">Profile</Link></li>
                        <li><Link to='AddActor' >AddActor</Link></li>     
                        <li><Link to="AddProducer">AddProducer</Link></li>
                        {/* <li><Link></Link></li> */}
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
    
    </>
}


export default Layout