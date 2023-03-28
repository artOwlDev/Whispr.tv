

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';

const Details = () => {
    const {id} = useParams();

    const[details, setDetails] = useState({});
    const[reviews, setReviews] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/w1280"

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
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data.results);
                setDetails(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        getDetails();
    },[])

    

  return (
    <div>
        <Nav/>
        <div className="info" style={{display: "flex", justifyContent: "space-between", margin: "4rem 24rem"}}>

            <div style={{marginRight: "2rem", display: "flex", flex: "1"}}>
                <img style={{objectFit: "contain", height: "50vh", borderRadius: "1rem", boxShadow: "0 0 0.5px white", backgroundSize: "100% 100%"}} src={IMAGES + details.poster_path} alt="" />   
            </div>
            <div className="text-div" style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", border: "1px solid white", flex: "2"}}>
               
                <h1 style={{fontFamily: "'Montserrat', sans-serif", margin: "2rem 2rem"}}>{details.name}</h1>
                <p style={{fontFamily: "'Montserrat', sans-serif", margin: "0rem 2rem"}}>{details?.first_air_date?.substring(0,4)} - {details?.last_air_date?.substring(0,4)}</p>
                <h3 style={{fontFamily: "'Montserrat', sans-serif", margin: "1rem 2rem"}}>Created by: {details?.created_by?.[0]?.name}</h3>
                <p>{details.overview}</p>

            </div>



        </div>
    </div>
  )
}

export default Details