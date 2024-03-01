import { NavLink,Outlet } from "react-router-dom"
// import {FaUser,FaMessage} from "react-icons";
export const AdminLayout=()=>{
    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin/users"> Users</NavLink></li>
                        <li><NavLink to="/admin/contacts"> Contacts</NavLink></li>
                        <li><NavLink to="/admin/services">Services</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet></Outlet>
    </>
}