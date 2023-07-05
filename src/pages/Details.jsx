

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';
import Footer from '../components/Footer';
import {useAuthState} from "react-firebase-hooks/auth"
import { authFirebase } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {AiFillStar, AiOutlinePlus,AiFillHeart} from "react-icons/ai"
import { TvItem } from '../components/TvItem';
import { MovieSharp } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import {MdFavorite, MdWatchLater} from "react-icons/md"
import {BiTime} from "react-icons/bi"
import Loader from '../components/Loader';

const Details = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const[user, loading] = useAuthState(authFirebase)
    const[details, setDetails] = useState({});
    const[reviews, setReviews] = useState([]);
    const[similarMovies, setSimilarMovies] = useState([]);
    const[similarTV, setSimilarTV] = useState([]);
    const[crew, setCrew] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/w1280"
    const {pathname} = useLocation();
    const mediaType = pathname.includes("tv") ? "tv" : "movie";
    const [hoveredStars, setHoveredStars] = useState(0);
    var director = "";
    const [isLoading, setIsLoading] = useState(true);

    const [showReviewBox, setShowReviewBox] = useState(false);
    const [boxTop, setBoxTop] = useState('80%');
    const [boxLeft, setBoxLeft] = useState('50%');
    let boxHeight;
    let boxWidth;
    const boxRef = useRef(null);



    

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
          },700); 
      
          return () => clearTimeout(timer);
    },[id])


    const handleStarHover = (index) => {
        setHoveredStars(index + 1);
      };
   
    useEffect(() => {
        async function getSimilarMovies(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                setSimilarMovies(response.data.results)
            }
            catch(error){
            }
        }
        getSimilarMovies();
    },[id])

    useEffect(() => {
        async function getSimilarTV(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                setSimilarTV(response.data.results)
            }
            catch(error){
            }
        }
        getSimilarTV();
    },[id])

    useEffect(() => {
        async function getReviews(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                setReviews(response.data)
            }
            catch(error){
            }
        }
        getReviews();
    },[])
    
    useEffect(() => {
        async function getDetails(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                console.log(response.data);
                setDetails(response.data)
            }
            catch(error){
                console.log(error);
            }
        }
        getDetails();
    },[id])

    useEffect(() => {
        async function getCrew(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
                setCrew(response.data)
                console.log(response.data.crew);
            }
            catch(error){
                console.log(error);
            }
        }
        getCrew();
    },[id])


    useEffect(() => {
        var tabName;
        if (mediaType === "tv"){
            tabName = details.name;
        }
        else{
            tabName = details.title;
        }
        document.title = `${tabName} | Whispr`;
        
    },[mediaType, details])

    const imagePath = details.poster_path;
    const itemName = mediaType === 'tv' ? details.name : details.title;
    const airDateText = mediaType === 'tv' ? 'Aired from: ' : 'Released in: ';
    const airDate =
    mediaType === 'tv'
      ? details?.first_air_date?.substring(0, 4) +
        (details?.last_air_date?.substring(0, 4) ===
        details?.first_air_date?.substring(0, 4)
          ? ' - present'
          : ` - ${details?.last_air_date?.substring(0, 4)}`)
      : details?.release_date?.substring(0, 4);
      const createdBy = mediaType === 'tv'
      ? details?.created_by?.[0]?.name
      : (crew?.crew || []).find(crewMember => crewMember.department === 'Directing')?.name;
    
    const overview = details.overview;
    const rating = details?.vote_average?.toString().substring(0,3);
    const creatorText = mediaType === 'tv' ? 'Created by' : 'Directed by'; 

    const handleReviewClick = () => {
        setShowReviewBox(!showReviewBox);
    };


    useLayoutEffect(() => {
        const handleScroll = () => {
            const box = boxRef.current;
            if (box) {
              const windowHeight = window.innerHeight;
              const boxHeight = box.offsetHeight;
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
              const topPosition = scrollTop + (windowHeight - boxHeight) / 2;
              box.style.top = `${topPosition + 100}px`;
            }
          };
      
          handleScroll();
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
      }, []);


      const handleClosingReview = () => {
        setShowReviewBox(!showReviewBox);
      }
    


    return(

        <div>
            {isLoading ? (
        <Loader/>
      ) : (
        <>
          <Nav />

          <div className='details-frag'>
            
                <div className="details">

                {showReviewBox && (
                    <>
                    <div className="overlay"></div>
                    <div
                        className="review-box"
                        ref={boxRef}
                        style={{
                        top: boxTop,
                        left: boxLeft,
                        height: `${boxHeight}px`,
                        width: `${boxWidth}px`,
                        }}
                    >
                        <h1 onClick={handleClosingReview}>THIS IS THE TEXT</h1>
                    </div>
                    </>
                )}
                    <div className="backdrop" style={{border: "none", display: "flex", justifyContent: "center", background: `linear-gradient(to right, transparent 40%, #14171d 90%), linear-gradient(to left, transparent 40%, #14171d 90%), url(${IMAGES + details.backdrop_path}) no-repeat center center / cover`}}>

                        
                    </div>
    
                 
                    <div className="details-info">
                        <div className="details-image-div">
                            <img src={IMAGES + imagePath} alt="" />   
    
                            <div className="rate-review">
                                <div className="star-rating">
                                    {[...Array(5)].map((_, index) => (
                                    <span key={index}
                                    className='star-icon'
                                    style={{ color: index < hoveredStars ? 'gold' : 'whitesmoke' }}
                                    onMouseEnter={() => handleStarHover(index)}
                                    onMouseLeave={() => setHoveredStars(0)}>
                                        &#9733;
                                    </span>
                                    
                                ))}
                                </div>

                                <div className='hori-line'></div>


                                <div className="icon-features">
                                    <AiOutlinePlus className='icon plus'/>
                                    <MdWatchLater className='icon watch'/>
                                </div>

                                <div className='hori-line'></div>


                                <div className="additional-features">
                                    <div className='feature-element'><h1 onClick={handleReviewClick}>Write a review</h1></div>
                                    <div className='feature-element'><h1>Add to list</h1></div>
                                    <div className='feature-element last'><h1>Share</h1></div>
                                </div>

                                

                                
                            </div>
                        </div>
                        <div className="details-text">

                
                            <div className="details-name">
                                <h1>{itemName} - </h1>
                                {details.tagline && <span>"{details.tagline}"</span>}

                            </div>
                            <h2><span>{airDateText}</span> {airDate}</h2>
                            <h3><span>{mediaType === "tv" ? 'Created by: ' : 'Director: '}</span> {createdBy}</h3>
                            <p>{overview}</p>
                            <p><span className='rating-text'>Average rating:</span> <span style={{color: rating >= 7 ? "#66FF99" : rating > 5 ? "yellow" : "red"}}>{rating}</span> / 10</p>

                            
    
                            <div className="actors">
                                {crew?.cast?.slice(0,9).map(actor => {
                                    return <div className='actors-div'>
                                        <Link to={`../../actor/${actor.id}`}>
                                            <img src={IMAGES + actor.profile_path} alt="" />
                                        </Link>
                                        <h1>{actor.name}</h1>
                                        <p className='actor-character-name'>{actor.character}</p>
                                    </div>
                                })}
                            </div>
                            
                        </div>
                    </div>
    
                    <div className="similar-movies">
                        <h1>{mediaType === "tv" ? 'Recommended TV shows' : "Recommended Movies"}</h1>
    

                        {mediaType === 'tv' &&  (
                            <div className="similar-movies-map">
                                {similarTV.length > 0 && similarTV?.slice(0,5).map((tv) => {
                                    return <TvItem image={tv.poster_path} title={tv.name} year={similarTV?.first_air_date?.substring(0,4) === similarTV?.last_air_date?.substring(0,4) ? " present" : similarTV?.last_air_date?.substring(0,4)} id={tv.id} type={"tv"}/>
                                })}
                            </div>
                        )}

                        {mediaType === 'movie' && (
                            <div className="similar-movies-map">
                                {similarMovies.length > 0 && similarMovies?.slice(0,5).map((movie) => {
                                    return <TvItem image={movie.poster_path} title={movie.title} year={movie.release_date} id={movie.id} type={"movie"}/>
                                })}
                            </div>
                        )}
                        
                    </div>
                </div>
            <Footer/>
    
        </div>

        </>
      )}
            
        </div>

        
    )
  
}

export default Details