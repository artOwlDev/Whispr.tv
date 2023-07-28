import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Nav } from '../components/Nav';
import { TvItem } from '../components/TvItem';


const Actor = () => {
    const[credits, setCredits] = useState([]);
    const[details, setDetails] = useState([]);
    const[movieCount, setMovieCount] = useState(18);
    const {id} = useParams();
    const IMAGES = "https://image.tmdb.org/t/p/w1280"
    const navigate = useNavigate();


    const handleMovieCount = () => {
        setTimeout(() => {
            setMovieCount(movieCount + 18);
        }, 500); // Add a delay of 2 seconds
    }

    useEffect(() => {
        document.title = `${details.name} | Whispr`;
    },[details])


    useEffect(() => {
        async function getCredits(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data);
                setCredits(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        getCredits();
    },[])

    useEffect(() => {
        async function getDetails(){

            try{
                const response = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data);
                setDetails(response.data);
            }
            catch(error){
                console.log(error);
            }
        }
        getDetails();
    },[])
    


  return (
    <React.Fragment>
        <Nav/>
        <div className='actor-details'>
          

            <div className="actor-details-text">
                <img src={IMAGES + details.profile_path} alt="" />
                <h1>{details.name}</h1>
                <p>{details.biography && details.biography.split('.').slice(0, 3).join('.')}</p>
            </div>


            <div className='hori-line'></div>
            <h1 className='notable'>Notable Roles</h1>

            <div className="actor-details-credits">
                {credits?.cast && credits?.cast?.slice(0,movieCount).map(movie => {
                    return <TvItem key={movie.id} image={movie.poster_path} title={movie.original_title || movie.name} year={movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)} id={movie.id} type={movie.media_type === "movie" ? "movie" : "tv"}/>
                })}
            </div>


            <div className="button-div">
            {movieCount < 36 && (
                <button className='button-actors' onClick={handleMovieCount}>View more</button>
            )}
            </div>





        </div>
        <Footer/>
    </React.Fragment>
  )
}


export default Actor