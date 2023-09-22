import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFilm, getActor, getCountry, getGenre, getProducer, getYear } from "../../features/film/filmAPI"
import { useForm } from "react-hook-form"
import st  from './style.module.css'
import { useNavigate } from "react-router-dom"


const AddFilm = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {genres, actors, producers, country, year} = useSelector(st => st.film)
        console.log(genres,actors,producers,country,year);
    useEffect(() => {
        dispatch(getGenre())
        dispatch(getActor())
        dispatch(getProducer())
        dispatch(getCountry())
        dispatch(getYear())
    },[])

    const {register, handleSubmit, formState:{errors}, setError } =useForm()

    const save =(data)=>{
        data.photo = data.photo[0]
        data.video = data.video[0]
       
        dispatch(addFilm(data)).unwrap().then((r)=> {
            
            console.log('server uxarkel', data);
            if(r.errors)
            for(let key in r.errors){
                const item = r.errors[key]
                for(let i = 0; i<item.length; i++){
                    setError(key,{message: item[i]})
                }
                
                setError(r.error)
                
            }else{
                navigate('/')
            }
        })
        .catch((error) => {
           
            console.error("sxal texi unecav", error);
        });
    }

    return <div className={st.addFilm}>
            <form onSubmit={handleSubmit(save)} >
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="Enter Title" {... register('title',{required:"Fill Fidd"})}/>
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="text" placeholder="Enter Description" {...register('description',{required:'Fill Fidd'})}></textarea>
                   
                    {errors.description && <p>{errors.description.message}</p>}
                </div>
                <div>
                    <label>Raigting</label>
                    <input type="text" placeholder="Enter Raiting"  min="1" max="10" step="1"
                    {...register('raiting',{required:'Fill Fidd', 
                                                        pattern:{value:/^[0-9]+$/,message: 'Only Numbers', min:{value:1,message:'Only Numbers'}, max:{value:10, message:"Only Numbers"}}})}/>
                    {errors.raiting && <p>{errors.raiting.message}</p>}
                </div>
                <div>
                    <label>Duration</label>
                    <input type="number" placeholder="Enter Duration" 
                    {...register('duration', {required:'Fill Fidd', pattern:{value:/^[0-9]+$/,message: 'Only Numbers', min:{value:1,message:'Only Numbers'}, max:{value:10, message:"Only Numbers"}}})} />
                      {errors.duration && <p>{errors.duration.message}</p>}                                     
                </div>
                <div>
                    <label>Photo</label>
                    <input  type="file" accept="image/*"  {...register('photo',{required: "Fill Fidd"})}/>
                    {errors.photo && <p>{errors.photo.message}</p>}
                </div>
                <label>Film</label>
                    <input type="file" accept="video/*" {...register('video',{required:"Fill Fidd"})}/>
                    {errors.video && <p>{errors.video.message}</p>}
                <div>
                    <select className={st.multiple} multiple {...register('genre',{required:"Fill Fidd"})}>
                        <option hidden>Genre</option>
                        {genres.map((elm,id)=>{
                            return <option key={id} value={elm.id} >
                                    {elm.genre}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <select className={st.multiple} multiple {...register('actor',{required:"Fill Fidd"})}>
                        <option hidden>Actor</option>
                        {actors.map((elm, id)=>{
                            return <option key={id} value={elm.id}>
                                {elm?.name && elm?.surname ? `${elm.name} ${elm.surname}` : ''}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <select {...register('producer',{required:"Fill Fidd"})}>
                        <option hidden>Producer</option>
                        {producers.map((elm,id)=>{
                            return <option key={id} value={elm.id}>
                                {elm?.name && elm?.surname ? `${elm.name} ${elm.surname}` : ''}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <select {...register('country',{required:"Fill Fidd"})}>
                        <option hidden>Country</option>
                        {country.map((elm,id) => {
                            return <option key={id} value={elm.id}>
                                {elm?.name}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <select {...register('year',{required:"Fill Fidd"})}>
                        <option hidden>Year</option>
                        {year.map((elm,id)=>{
                            return <option key={id} value={elm.id}>
                                {elm?.year}
                            </option>
                        })}
                    </select>
                </div>
                <button>AddFilm</button>
            </form>
        
    </div>
}

export default AddFilm