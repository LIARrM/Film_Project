import { createSlice } from "@reduxjs/toolkit"

import {filter, filterCountry, filterGenre, filterYear, getActor, getCountry, getFilm, getFilmById, getGenre, getProducer, getYear, logout_user, userProfile,postComent, getComment} from "./filmAPI"





const initialState = {
    user:{},
    genres:[],
    year:[],
    country:[],
    actors:[],
    producers:[],
    films:[],
    filmId:[],
    comment:[],
}


const filmSlice = createSlice({
    name:'film',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userProfile.fulfilled,(state,action)=>{
            state.user = action.payload.user
        })

        builder.addCase(getGenre.fulfilled,(state,action) => {
            state.genres = action.payload.genre
            // console.log('fulfilled', action.payload);
        })
        builder.addCase(getYear.fulfilled,(state,action) =>{
            state.year = action.payload.year
        })
        builder.addCase(getCountry.fulfilled,(state,action) => {
            state.country =action.payload.country
        })
        builder.addCase(getActor.fulfilled,(state,action)=>{
            state.actors = action.payload.actor
        })
        builder.addCase(getProducer.fulfilled,(state,action)=>{
            state.producers = action.payload.producer
        })
        builder.addCase(getFilm.fulfilled,(state,action) =>{
            state.films = action.payload.films
        })
        builder.addCase(getFilmById.fulfilled, (state, action) =>{
            state.filmId = action.payload.film
        })
        builder.addCase(logout_user.fulfilled,(state, action)=>{
            state.user = {}
        })
        builder.addCase(filterGenre.fulfilled,(state, action)=>{
            state.films = action.payload.films
        })

        builder.addCase(filterYear.fulfilled,(state, action) =>{
            state.films = action.payload.films
        })
        builder.addCase(filterCountry.fulfilled,(state,action)=>{
            state.films = action.payload.films
        })
        builder.addCase(filter.fulfilled,(state, action) =>{
            state.films = action.payload.films
        })
        builder.addCase(getComment.fulfilled,(state, action)=>{
            state.comment = action.payload.comment
        })
    }
})


export default filmSlice.reducer