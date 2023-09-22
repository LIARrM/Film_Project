import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { loginUser } from "../../features/film/filmAPI"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import ForgetPassword from "./forgetPassword"
import { useSelector } from "react-redux"
import st from './style.module.css'

const Login = () => {


    const {register, handleSubmit, formState: {errors}} =useForm()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error, setError] = useState('')

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const log = (data) => {
        dispatch(loginUser(data))
        .unwrap()
        .then(r =>{
            if(r.error){
                setError(r.error)

            }else{
                localStorage.setItem('user', r.token)
                navigate('/')
            }
            console.log(r);
        })


    }

    return <div className={st.login}>
{/* {isAuthenticated ? (
      navigate('/profile')
    ) : ()} */}
                <form onSubmit={handleSubmit(log)} className={st.form}>
                    {error !== ''? <p>{error}</p>:''}
                    <div>
                        <label>User_Name</label>
                        <input type="text" placeholder="Enter User_Name" {...register('username')}/>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" {...register('password')} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <button>Log</button>
                    <Link to='/ForgetPassword/' className={st.links}>Forgot Password</Link>
                </form>
                
            </div>

}

export default Login