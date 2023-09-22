
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { delFilm, deleteComment, getComment, getFilmById, postComment } from "../../features/film/filmAPI";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import st from './style.module.css'
import { useForm } from "react-hook-form";

const ProfileFilm = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { id } = useParams()
  // console.log(id);

  const { filmId, comment, user } = useSelector(st => st.film)
  console.log(filmId);
  console.log(comment);
  console.log(user);

  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  const addComment = (data) => {
    dispatch(postComment({ ...data, film: id }))
      .unwrap()
      .then((r) => {
        if (r.errors) {

          for (let key in r.errors) {
            setError(key, { message: r.errors[key][0] })
          }
        } else {
          dispatch(getComment(id))
        }
      })
  }


  useEffect(() => {
    dispatch(getFilmById(id))
    dispatch(getComment(id))
  }, [id])



  const stars = '★'.repeat(filmId?.raiting || 0);

  const deleteCom = (id) => {
    dispatch(deleteComment(id))
      .unwrap()
      .then((r) => {
        console.log(r)
      })

  }

  const deleteFilm = () => {
    dispatch(delFilm(id))
    navigate('/')
  }

  return <>


    <div className={st.profile}>

      <h1>Title:  {filmId?.title}</h1>

      <video width="320" height="240" controls src={"http://127.0.0.1:8000" + filmId.video} />
      {comment.map((elm, id) => {
        console.log(elm);
        return <div key={id} value={elm}>
          <h1>{elm.user.first_name} </h1> <p>{elm?.text}</p>
          {user.id == elm.user.id &&
          <button onClick={() => deleteCom(elm.id)}>Delete Comment</button>}
        </div>
      })}


      {filmId.actor && filmId.actor.length > 0 && (
        <h2>Actors: {filmId.actor.map((actor) => `${actor.name} ${actor.surname}`).join(', ')}</h2>

      )}
      <h2>Country:  {filmId?.country?.name} </h2>
      <p>Description:  {filmId?.description}</p>
      <h3>Duration:  {filmId?.duration} h</h3>
      {filmId?.genre && filmId.genre.length > 0 && (

        <h3>Genres: {filmId.genre.map((genre) => genre.genre).join(', ')}</h3>
      )}

      <h3>Producer: {filmId?.producer?.name} {filmId?.producer?.surname}</h3>
      <h4>Year Film: {filmId?.year?.year} </h4>


      <h4>  Rating: <span style={{ fontSize: '50px', color: 'yellow' }}>{stars}</span></h4>




      {user.id == filmId.user && (<button onClick={() => deleteFilm()}>Delete</button>)}




      <div className={st.comment}>
        <label>Add Comment</label>
        <textarea placeholder="Add Comment " {...register('text', { required: "Fill Fidd" })} />
        {errors.text && <p>{errors.text.message}</p>}
        {/* <ReactStars count={5} value={rating} onChange={handleRatingChange} size={24} color2={"#ffd700"} /> */}
      </div>
      <div>
        <label>Rating</label>
        <input type="number" placeholder="Enter Rating"
          {...register('rating', { required: 'Fill Fidd', pattern: { value: /^[0-9]+$/, min: { value: 1, message: 'Only Numbers' }, max: { value: 10, message: "Only Numbers" } } })} />
        {errors.rating && <p>{errors.rating.message}</p>}
      </div>
      <button onClick={handleSubmit(addComment)}>AddComment</button>
    </div>




  </>
}

export default ProfileFilm