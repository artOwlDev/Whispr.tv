
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'

const Upcoming = () => {

    const[upcoming, setUpcoming] = useState([]);



    https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
    

    useEffect(() => {
        async function getUpcoming(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                console.log(response.data);
                setUpcoming(response.data.results)
            }
            catch(error){
                console.log(error);
            }
        }
        getUpcoming();
    },[])



  return (
    <div>
        <Nav/>

        <div className="upcoming-container">
            <div className="upcoming-banner">
                <div className="upcoming-banner-left">
                    <h1>The Witcher</h1>
                    <h3>2020</h3>
                    

                </div>
                <div className="upcoming-banner-right">
                </div>
            </div>

            <div className="upcoming-list">

            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Upcoming