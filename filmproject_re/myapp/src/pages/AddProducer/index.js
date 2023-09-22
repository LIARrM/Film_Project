import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { postProducer } from "../../features/film/filmAPI"
import st from './style.module.css'




const AddProducer = () =>{


    const dispatch = useDispatch()

    const {register, handleSubmit, formState:{errors}, setError} = useForm()

    const save = (data) => {
        dispatch(postProducer(data))
          .unwrap()
          .then((r) => {
            if (r.errors) {
           
              for (let key in r.errors) {
                const item = r.errors[key]
                
                setError(key, { message: item[0] })
              }
            }
            console.log('server uxarkel', data)
          })
          .catch((error) => {
           
            console.error('Error:', error)
           
          })
      }
      

    return <div className={st.producer}>
        <form onSubmit={handleSubmit(save)} > 
            <div>
                <label>Name</label>
                <input  placeholder="Enter Name Actor" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label>SurName</label>
                <input  placeholder="Enter SurName Actor" {...register('surname')} />
                {errors.surname && <p>{errors.surname.message}</p>}
            </div>
            <div>
                <label>Age</label>
                <input  placeholder="Enter age Actor" {...register('age')} />
                {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div>
                <button>Add Actor</button>
            </div>
           
        </form>
    </div>
}

export default AddProducer