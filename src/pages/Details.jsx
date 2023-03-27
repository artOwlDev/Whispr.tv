

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
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
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
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`)
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
        <div className="info" style={{display: "flex", width: "100%", justifyContent: "space-around", margin: "4rem", }}>

            <div className="image-div" style={{marginRight: "2rem"}}>
                <img style={{objectFit: "contain", height: "50vh", borderRadius: "1rem"}}src={IMAGES + details.poster_path} alt="" />   
            </div>
            <div className="text-div" style={{}}>
               
                <h1>{details.name}</h1>
                <p>{details?.first_air_date?.substring(0,4)}</p>
                <h3>Created by: {details?.created_by?.[0]?.name}</h3>

            </div>



        </div>
    </div>
  )
}

export default Details