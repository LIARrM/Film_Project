import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { changePassword } from "../../features/film/filmAPI"
import { useNavigate } from "react-router-dom"
import st from './style.module.css'



const ForgetPassword = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, setError} = useForm()


    
    const change = (data) => {
        // console.log(data);
        dispatch(changePassword(data))
          .unwrap()
          .then((r) => {
            // navigate('/')
            console.log(r);
            if (r.errors) {
              for (let key in r.errors) {
                const item = r.errors[key];
                for (let i = 0; i < item.length; i++) {
                  setError(key, { message: item[i] });
                }
              }
      
              setError(r.error);
              
              navigate('/ForgetPassword/');
            } else {
              navigate('/login');
            }
          });
      }


    return <div className={st.forget}>
            <form onSubmit={handleSubmit(change)} className={st.forgetForm}>
                <div>
                    <label>Username</label>
                    <input placeholder="User Name" {...register('username')} />
                    {errors.uername && <p className={st.error}>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Old Password</label>
                    <input type="password" placeholder="old_password" {...register('old_password')} />
                    {errors.old_password && <p className={st.error} >{errors.old_password.message}</p>}
                </div>
                <div>
                    <label>New Password 1</label>
                    <input type="password" placeholder="New Password 1" {...register('new_password1')} />
                    {errors.new_password1 && <p className={st.error}>{errors.new_password1.message}</p>}
                </div>
                <div>
                    <label>New Password 2</label>
                    <input type="password" placeholder="New Password 2" {...register('new_password2')} />
                    {errors.new_password2 && <p className={st.error}>{errors.new_password2.message}</p>}
                </div>
                <button>Change</button>
            </form>

        </div>
}

export default ForgetPassword