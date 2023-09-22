import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { userProfile } from "../../features/film/filmAPI"
import { useState } from "react"

const AuthHoc = () => {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [response, setResponse] = useState(false)

    useEffect(()=> {
        if (!localStorage.user){
            navigate('/login')
        }else{
            dispatch(userProfile()).unwrap().then((r)=>{
                setResponse(true)
            }).catch((e)=> {
                navigate('/login')
            })
        }
    },)

    return <div>
        {response && <Outlet />}
    
    </div>
}

export default AuthHoc