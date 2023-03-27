

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';

const Details = () => {
    const {id} = useParams();

    const[details, setDetails] = useState({});
    const[reviews, setReviews] = useState([]);

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
        <div className="info">

            <h1>{details.name}</h1>

        </div>
    </div>
  )
}

export default Details