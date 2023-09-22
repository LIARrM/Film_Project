import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../app/config";


export const registrationUser = createAsyncThunk(
    'post/add/user',
    async(user) => {
        const {data} = await Axios.post('register',user)
        return data
    }
)



export const loginUser = createAsyncThunk(
    'post/login',
    async (user) => {
        const {data} = await Axios.post('login', user)
        return data
    }
)

export const userProfile = createAsyncThunk(
    'get/profile',
    async () =>{
        const {data} = await Axios.get('profile',{
            headers:{
                Authorization:`Token ${localStorage.user}`
                
            }
        }).then((r)=>{
            return r
        })
        return data
    }
)



export const getGenre = createAsyncThunk(
    'get/genre',
    async() =>{
        const {data} = await Axios.get('genre')
        return data
    }
)

export const getYear = createAsyncThunk(
    'get/year',
    async() =>{
        const {data} = await Axios.get('year')
        return data
    }
)


export const getCountry = createAsyncThunk(
    'get/country',
    async() =>{
        const {data} = await Axios.get('country')
        return data
    }
)


export const getActor = createAsyncThunk(
    'get/actor',
    async() =>{
        const {data} = await Axios.get('actor')
        return data
    }
)


export const getProducer = createAsyncThunk(
    'get/producer',
    async() =>{
        const {data} = await Axios.get('producer')
        return data
    }
)

export const addFilm = createAsyncThunk(
    'post/add/film',
    async(film)=>{
        const form = new FormData()
        for(let i in film){
            const item = film[i]
            if(item instanceof Array){
                item.forEach(el => {
                    form.append(i,el)
                })
            }else{
                form.append(i, item)
            }
        }
        const {data} = await Axios.post('film', form,{
            headers:{
                Authorization:`Token ${localStorage.user}`,
                "Content-Type":'multipart/form-data'
            }
        })
            return data
       
    }
)

export const getFilm = createAsyncThunk(
    'get/getFilm',
    async () => {
        const {data} = await Axios.get('getFilm')
        return data
    }
)


export const getFilmById = createAsyncThunk(
    'get/film/id',
    async(id)  =>{
        const {data} = await Axios.get('film/' +id)
        return data
    }
)


export const postComment = createAsyncThunk(
    'post/add/commentFilm/',
    async (commentFilm) => {
      const token = localStorage.getItem('user');
      const { data } = await Axios.post('commentFilm/', commentFilm, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      return data
    }
  )

  export const getComment = createAsyncThunk(
    'get/get_comment/',
    async(id) =>{
        const {data} = await Axios.get('get_comment/' + id)
        return data
    }
  )



export const deleteComment = createAsyncThunk(
    'postcomments/delete/',
    async(id) =>{
        console.log('id', id);
        const {data} = await Axios.delete('comments/delete/'+ id,{
            headers:{
                Authorization:`Token ${localStorage.user}`
            }
        })
        return data
    }
)


export const logout_user = createAsyncThunk(
    'get/logout',
        async ()=>{
            const {data} = await Axios.get('logout', {
                headers:{
                    Authorization: `Token ${localStorage.user}`
                }
            }).then((r) => {
                localStorage.removeItem('user')
            })
            return data
        }
)

export const delFilm = createAsyncThunk(
    'delete/delFilm',
    async (id)=> {
        const {data} = await Axios.delete('delFilm/' +id)
        return data
    }
)


export const filterGenre = createAsyncThunk(
    'get/filterGenre/genre',
    async (genre) =>{
        const {data} = await Axios.get('filterGenre/'+genre)
        return data
    }
)


export const filterYear =createAsyncThunk(
    'get/filterYear',
    async (id) => {
        const {data} = await Axios.get('filterYear/' +id)
        return data
    }

)


export const filterCountry = createAsyncThunk(
    'get/filterCountry',
    async(id) => {
        const {data} = await Axios.get('filterCountry/' +id)
        return data
    }
)


export const filter = createAsyncThunk(
    'get/filter',
    async(title) => {
        const {data} = await Axios.get(`/search/${title}`)
        return data
    }
)

export const changePassword = createAsyncThunk(
    'put/changePassword',
    async(changedData)=>{
        const {data} = await Axios.put('changePassword/', changedData)
        return data
    }
)




export const updateLastName= createAsyncThunk(
    'put/change_last_name/',
    async (update) => {
      
        const token = localStorage.getItem('user');
  
        const {data} = await Axios.put('change_last_name/', update, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
  
        return data
      
    }
  )
  


  export const updateFirstName= createAsyncThunk(
    'put/change_first_name/',
    async (update) => {
      
        const token = localStorage.getItem('user');
  
        const {data} = await Axios.put('change_first_name/', update, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
  
        return data
      
    }
  )
  
  export const updateEmail= createAsyncThunk(
    'put/change_email/',
    async (update) => {
      
        const token = localStorage.getItem('user');
  
        const {data} = await Axios.put('change_email/', update, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
  
        return data
      
    }
  )
  


  export const updateUserName= createAsyncThunk(
    'put/change_username/',
    async (update) => {
      
        const token = localStorage.getItem('user');
  
        const {data} = await Axios.put('change_username/', update, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
  
        return data
      
    }
  )


  export const postActor = createAsyncThunk(
    'post/add/actor',
    async(actor) =>{
        const token = localStorage.getItem('user');
        const {data} = await Axios.post('addActors/', actor,{
            headers:{
                Authorization: `Token ${token}`
            }
        })
        return data
    }
  )


  export const postProducer = createAsyncThunk(
    'post/add/producer',
    async (producer) => {
        const token = localStorage.getItem('user');
        const {data} = await Axios.post('addProducer/', producer,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return data
    }
  )

  
//   export const postComment = createAsyncThunk(
//     'post/add/commentFilm/',
//     async (commentFilm) => {
//       const token = localStorage.getItem('user');
//       const { data } = await Axios.post('commentFilm/', commentFilm, {
//         headers: {
//           Authorization: `Token ${token}`
//         }
//       })
//       return data
//     }
//   )