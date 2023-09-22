

import { useRoutes } from "react-router-dom";
import Layout from "../Layout"
import Home from "../../pages/Home"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"
import AddActor from "../../pages/AddActor";
import AddFilm from "../../pages/AddFilm";
import Profile from "../../pages/Profile"
import AddProducer from "../../pages/AddProducer"
import AboutFilm from "../../pages/AboutFilm"
import AuthHoc from "../AuthHoc";
import ProfileFilm from "../../pages/Home/profile";
import ForgetPassword from "../../pages/Login/forgetPassword";

const Routers = () => {

    return useRoutes ([
        {
            path:'*',
            element: <h1> not page found</h1>
        },
        {
            path:'/',
            element:<Layout />,
            children:[
                
                {path:"", element:<Home /> },
                {path:"Login", element: <Login />},
                {path:"Registration", element: <Registration />},
                {path:"profile", element: <Profile/>},
                
                
                {path:'',

                element:<AuthHoc />,
                 children:  [
                    // {path:'profile', element:<Profile />},
                    {path:"AddFilm", element:<AddFilm />},
                    {path:"ProfileFilm/:id", element: <ProfileFilm />},
                    {path:'AddActor', element:<AddActor />},
                    {path:'AddProducer', element: <AddProducer />},
                    {path:'ForgetPassword', element:<ForgetPassword />},
                    
                    
                    // {path:"AddActor",element:<AddActor />},
                    // {path:"AddProducer",element:<AddProducer />},
                    // {path:"AboutFilm", element:<AboutFilm />}
                ]
            
            }
                
            ]
        }
    ])

}

export default Routers