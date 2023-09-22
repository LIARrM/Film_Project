import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import { registrationUser } from "../../features/film/filmAPI"
import { useNavigate } from "react-router-dom"
import st from './style.module.css'

const Registration = () => {

    const {register, handleSubmit, formState:{errors}, setError} =useForm()  // bazayic errorner@ cuyc talis setError

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const save = (data) => {
        dispatch(registrationUser(data)).unwrap().then((r) => {
            if(r.errors)
                for(let key in r.errors){
                    const item = r.errors[key]
                    for(let i = 0; i<item.length; i++){
                        setError(key,{message: item[i]})
                    }
            }else {
                navigate('/login')
            }
            console.log(r);
        })
        console.log(data);
    }

    return <div className={st.reg}>
            <form onSubmit={handleSubmit(save)}>
                <div>
                    <label>First Name</label>
                    <input type="text" {...register ('first_name')} />
                    {errors.first_name && <p>{errors.first_name.message}</p>} 
                </div>
                <div>
                    <label>user name</label>
                    <input type="text" {...register ('username')} />
                    {errors.username && <p>{errors.username.message}</p>} 
                </div>
                <div>
                    <label>last name</label>
                    <input type="text" {...register ('last_name')} />
                    {errors.last_name && <p>{errors.last_name.message}</p>} 
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" {...register ('password1')} />
                    {errors.password1 && <p>{errors.password1.message}</p>} 
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="text" {...register ('password2')} />
                    {errors.password2 && <p>{errors.password2.message}</p>} 
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" {...register ('email')} />
                    {errors.email && <p>{errors.email.message}</p>} 
                </div>
                <button>Registration</button>
            </form>
    
   
    </div>
}

export default Registration