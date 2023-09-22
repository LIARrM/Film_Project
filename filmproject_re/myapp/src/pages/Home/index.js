import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCountry, getGenre, getYear,getFilm, filterGenre, filterYear, filterCountry, filter } from "../../features/film/filmAPI";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import st from './style.module.css'
import { baseURL } from "../../app/config";
// import ProfileFilm from "./profile";



const Home = () => {

    const dispatch = useDispatch()

    const {genres,year,country,films} = useSelector(st => st.film)
    console.log(genres,year,country,films);

    const {register, handleSubmit, formState:{errors}} = useForm()
    
    useEffect(()=>{
        dispatch(getGenre())
        dispatch(getYear())
        dispatch(getCountry())
        dispatch(getFilm())
        
    },[])



    const filterGenres = (genre)=>{
        if (genre==''){
            dispatch(getFilm())
        } else {
        dispatch(filterGenre(genre))
        }
    }

    const filterYears = (id)=>{ 
        if (id==''){
            dispatch(getFilm())
        } else {

            dispatch(filterYear(id))
        }
    }

    const filterCountrys = (id) =>{
        if (id==''){
            dispatch(getFilm())
        } else {

            dispatch(filterCountry(id))
        }
    }

    const glFilter = (title) =>{
        if(title ==''){
            dispatch(getFilm())
        }else{
            dispatch(filter(title))
        }
       
    }

    const [currentPage, setCurrentPage] = useState(0);
    const filmsPerPage = 6; 

    const indexOfLastFilm = (currentPage + 1) * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
  
    return <div className={st.home}>
        
            <form className={st.form}>
                <div className={st.search}>
                    <label>Search</label>
                    <input type="text" placeholder="Search" {...register('title')} onChange={(e) => glFilter(e.target.value)} />
                    {/* <button>Search</button> */}
                </div>
                <div>
                    <select {...register('genre')}  onChange={(e)=>filterGenres(e.target.value)}>
                        <option hidden> Genre</option>
                        <option value={''}> All</option>
                        
                            {genres.map((elm,id)=>{
                                return <option key={id} value={elm.id}>
                                    {elm?.genre}
                                </option>
                            })}
                       
                    </select>
                </div>
                <div>
                    <select {...register('year')} onChange={(e)=>filterYears(e.target.value)}>
                        <option hidden> Year</option>
                        <option value={''}> All</option>
                        {year.map((elm,id) =>{
                            return <option key={id} value={elm.id} >
                                {elm?.year}
                            </option>
                        })}
                    </select>
                </div>
                <div>
                    <select {...register('country')} onChange={(e) => filterCountrys(e.target.value)}>
                        <option hidden>Country</option>
                        <option value={''}> All</option>
                        {country.map((elm,id)=>{
                            return <option key={id} value={elm.id}>
                                {elm?.name}
                            </option>
                        })}
                    </select>
                </div>
               
            </form>
        <div className={st.film}> {
        currentFilms.map((elm,id) =>{
            return <div key={id} value={elm.id}>
                <h1><Link to={"/ProfileFilm/" + elm.id}>{elm.title} {elm.actors}</Link></h1>
                <img src={baseURL+elm.photo}  width={300} height={300} />
            </div>
        })
   }
       
        </div> 
       <div className={st.Page}> 
            <ReactPaginate previousLabel={"← Prev"} nextLabel={"Next → "}
                             pageCount={Math.ceil(films.length / filmsPerPage)}
                                onPageChange={({ selected }) => setCurrentPage(selected)}
                                    previousLinkClassName={st["prev-button"]} 
                                         nextLinkClassName={st["next-button"]}  />
        </div>
    </div>

    
}

export default Home

