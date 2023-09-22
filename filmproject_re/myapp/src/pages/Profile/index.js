import { useDispatch, useSelector } from "react-redux"
import { loginUser, logout_user, updateEmail, updateFirstName, updateLastName, updateUserName, userProfile } from "../../features/film/filmAPI"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import st from './style.module.css'

const Profile = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    
    const {user} = useSelector(st => st.film)
    console.log(user);

   const {register, handleSubmit, formState:{errors}} = useForm()

useEffect(()=>{
    dispatch(loginUser())
     dispatch(userProfile())
},[])

const firsName = (data) => {
 
    dispatch(updateFirstName(data))
        .unwrap().then((r) => {
            // navigate('/profile')
            console.log(r);
            
        })
}

const lastName = (data) => {
 
    dispatch(updateLastName(data))
        .unwrap().then((r) => {
            // navigate('/profile')
            console.log(r);
            
        })
}

const Email = (data) => {
 
    dispatch(updateEmail(data))
        .unwrap().then((r) => {
            navigate('/profile')
            console.log(r);
            
        })
}

const userName = (data) => {
 
    dispatch(updateUserName(data))
        .unwrap().then((r) => {
            // navigate('/profile')
            console.log(r);
            
        })
}


const logout = ()=> {
    dispatch(logout_user())
    navigate('/')
}
    return <div className={st.change}>
                <div className={st.namelog}>
                    <h1>{user.first_name} {user.last_name}</h1> 
                    <button onClick={()=> logout()}>log out</button>
                </div>
       <form> 
            <div>
                <label>Change First_Name</label>
                <input  type="text"  placeholder="Write first name" {...register('first_name')} />
                {/* {errors.first_name && <p>{errors.first_name.message}</p>} */}
                <button onClick={handleSubmit(firsName)}>Change first_name</button>
            </div>
            <div>
                <label>Change Last_Name</label>
                <input type="text" placeholder="write new last name" {...register('last_name')} />
                {/* {errors.last_name && <p>{errors.last_name.message}</p>} */}
                <button onClick={handleSubmit(lastName)}>Change Last_name</button>
            </div>
            <div>
                <label>Change Email</label>
                <input type="email" placeholder="write email" {...register('email')} />
                <button onClick={handleSubmit(Email)}>Email change</button>
            </div>
            <div>
                <label>Change User Name</label>
                <input  type="text" placeholder="write user name" {...register('username')} />
                <button onClick={handleSubmit(userName)}>Change User_name</button>
            </div>
       </form>
    </div>
}

export default Profile