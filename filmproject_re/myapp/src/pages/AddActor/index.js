import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { postActor } from "../../features/film/filmAPI"
import st from './style.module.css'


const AddActor = () => {


    const dispatch = useDispatch()



    const {register, handleSubmit, formState:{errors}, setError} = useForm()


    const save = (data) => {
        dispatch(postActor(data))
          .unwrap()
          .then((r) => {
            if (r.errors)
             for(let key in r.errors){
                const item = r.errors[key]
                for(let i = 0; i<item.length; i++){
                    setError(key,{message: item[i]})
                }
                
                setError(r.error)
                
            } else {
              console.log('Server response:', r)
              
            }
          })
          .catch((error) => {
            
            console.error('Error:', error);
            
          })
      }
      
    return<div className={st.actor}>
        <form onSubmit={handleSubmit(save)}>
            <div>
                <label>Name</label>
                <input  placeholder="Enter Name Actor" {...register('name')} />
                {errors.name && <p className={st.error}>{errors.name.message}</p>}
            </div>
            <div>
                <label>SurName</label>
                <input  placeholder="Enter SurName Actor" {...register('surname')} />
                {errors.surname && <p className={st.error}>{errors.surname.message}</p>}
            </div>
            <div>
                <label>Age</label>
                <input  placeholder="Enter age Actor" {...register('age')} />
                {errors.age && <p className={st.error}>{errors.age.message}</p>}

            </div>
            <button>Add Actor</button>
        </form>
    </div>
}

export default AddActor