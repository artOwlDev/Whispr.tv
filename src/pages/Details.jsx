

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';
import Footer from '../components/Footer';

const Details = () => {
    const {id} = useParams();

    const[details, setDetails] = useState({});
    const[reviews, setReviews] = useState([]);
    const[crew, setCrew] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/w1280"
    const {pathname} = useLocation();
    const mediaType = pathname.includes("tv") ? "tv" : "movie";
    var director = "";

    useEffect(() => {
        async function getReviews(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                console.log(response.data.results);
                setReviews(response.data.results)
            }
            catch(error){
                console.log(error);
            }
        }
        getReviews();
    },[])
    
    useEffect(() => {
        async function getDetails(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data.results);
                setDetails(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        getDetails();
    },[])

    useEffect(() => {
        async function getCrew(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data.results);
                setCrew(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        getCrew();
    },[])

    useEffect(() => {
        const tabName = mediaType === "tv"  ? `${details?.name}` : `${details?.title}`
        document.title = tabName;
    },[])



    

    

  return (
    <div>
        <Nav/>
        {mediaType === "tv" &&
            <div className="div">
                <div className="" style={{display: "flex", justifyContent: "center", width: "100vw"}}>
                    <div className="backdrop" style={{display: "flex", justifyContent: "center", background: `linear-gradient(to right, transparent 20%, #14171d 90%), linear-gradient(to left, transparent 20%, #14171d 90%), url(${IMAGES + details.backdrop_path}) no-repeat center center / cover`, objectPosition: 'center bottom', height: "40vh", width: "50vw", borderRadius: "4rem", border: "0", overflow: "", opacity: "0.8", paddingBottom: "20rem"}}></div>
                </div>

                <div className="info" style={{display: "flex", justifyContent: "space-between", margin: "1rem 24rem"}}>
                    <div style={{marginRight: "2rem", display: "flex", flex: "1"}}>
                        <img style={{objectFit: "contain", height: "48vh", borderRadius: "1rem", boxShadow: "0 0 0.5px white", backgroundSize: "100% 100%"}} src={IMAGES + details.poster_path} alt="" />   
                    </div>
                    <div className="text-div" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start",flex: "2", gap: "1rem"}}>
                        <h1 style={{fontFamily: "'Montserrat', sans-serif", fontSize: "2.8rem", fontWeight: "bolder"}}>{details.name}</h1>
                        <h2 style={{fontFamily: "'Montserrat', sans-serif"}}>{details?.first_air_date?.substring(0,4)} - {details?.first_air_date?.substring(0,4) === details?.last_air_date?.substring(0,4) ? " present" : details?.last_air_date?.substring(0,4)}</h2>
                        <h3 style={{fontFamily: "'Montserrat', sans-serif"}}>Created by: {details?.created_by?.[0]?.name}</h3>
                        <p>{details.overview}</p>
                        <p>{details.average_rating}</p>
                    </div>
                </div>
            </div>
        }

        {mediaType === "movie" &&
            <div className="div">      
                <div className="" style={{display: "flex", justifyContent: "center", width: "100vw"}}>
                    <div className="backdrop" style={{display: "flex", justifyContent: "center", background: `linear-gradient(to right, transparent 20%, #14171d 90%), linear-gradient(to left, transparent 20%, #14171d 90%), url(${IMAGES + details.backdrop_path}) no-repeat center center / cover`, objectPosition: 'center bottom', height: "40vh", width: "50vw", borderRadius: "4rem", border: "0", overflow: "", opacity: "0.8", paddingBottom: "20rem"}}></div>
                </div>       
   
                <div className="info" style={{display: "flex", justifyContent: "space-between", margin: "1rem 24rem"}}>
                    <div style={{marginRight: "2rem", display: "flex", flex: "1"}}>
                        <img style={{objectFit: "contain", height: "50vh", borderRadius: "1rem", boxShadow: "0 0 0.5px white", backgroundSize: "100% 100%"}} src={IMAGES + details.poster_path} alt="" />   
                    </div>
                    <div className="text-div" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start",flex: "2", gap: "1rem"}}>
                        <h1 style={{fontFamily: "'Montserrat', sans-serif", fontSize: "2.8rem", fontWeight: "bolder"}}>{details.title}</h1>
                        <h2 style={{fontFamily: "'Montserrat', sans-serif", fontSize: "1.2rem"}}>Released: {details?.release_date?.substring(0,4)}</h2>


                        {/* Getting director name */}
                        {crew?.crew?.map(crew => {
                            crew?.job === "Director" ? director = crew.name : "Not found"
                        })}
                        
                        <h3 style={{fontFamily: "'Montserrat', sans-serif"}}>Directed by: {director}</h3>
                        <p>{details.overview}</p>
                        <p>{details.average_rating}</p>
                    </div>
                </div>
            </div>

        }
        <Footer/>

    </div>
  )
}

export default Details