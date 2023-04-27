import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Nav } from '../components/Nav';

const Actor = () => {
    const[credits, setCredits] = useState([]);
    const[details, setDetails] = useState([]);
    const {id} = useParams();
    const IMAGES = "https://image.tmdb.org/t/p/w1280"


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
            <img src={IMAGES + details.profile_path} alt="" />

            <div className="actor-details-text">
                <h1>{details.name}</h1>
                <p>{details.biography && details.biography.split('.').slice(0, 3).join('.')}</p>
            </div>




        </div>
        <Footer/>
    </React.Fragment>
  )
}


export default Actor