

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';
import Footer from '../components/Footer';
import {useAuthState} from "react-firebase-hooks/auth"
import { authFirebase } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {AiOutlineDelete, AiFillStar, AiOutlinePlus,AiFillHeart, AiOutlineClose, AiFillDislike, AiFillLike} from "react-icons/ai"
import {TbStarHalfFilled, TbStarFilled} from "react-icons/tb"
import { TvItem } from '../components/TvItem';
import { MovieSharp } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import {MdFavorite, MdWatchLater} from "react-icons/md"
import {BiTime} from "react-icons/bi"
import Loader from '../components/Loader';
import notfound from "../img/notfound.png";
import {getFirestore, doc, collection, getDocs, addDoc, deleteDoc, query, where, updateDoc, getDoc, onSnapshot} from "firebase/firestore"
import example from "../img/banner11.jpg"
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io"






const Details = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const[user, loading] = useAuthState(authFirebase)
    const[details, setDetails] = useState({});
    const[reviews, setReviews] = useState([]);
    const[similarMovies, setSimilarMovies] = useState([]);
    const[similarTV, setSimilarTV] = useState([]);
    const[crew, setCrew] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/original"
    const {pathname} = useLocation();
    const mediaType = pathname.includes("television") ? "tv" : "movie";
    const [hoveredStars, setHoveredStars] = useState(0);
    var director = "";

    const [isLoading, setIsLoading] = useState(true);

    const [entries, setEntries] = useState([]); 
    const [reviewNum, setReviewNum] = useState(4);
    const [likedStatus, setLikedStatus] = useState(false);

    const [showReviewBox, setShowReviewBox] = useState(false);
    const [boxTop, setBoxTop] = useState('80%');
    const [boxLeft, setBoxLeft] = useState('50%');
    let boxHeight;
    let boxWidth;
    const boxRef = useRef(null);

    const [text, setText] = useState('');
    const maxLength = 300;

    const [copied, setCopied] = useState(false);


    const totalStars = 5;
    const ratingOutOf5 = Math.floor((details.vote_average / 2) * 2) / 2; // Convert rating out of 10 to rating out of 5 and round to the nearest half smaller
  
    const fullStars = Math.floor(ratingOutOf5);
    const hasHalfStar = (ratingOutOf5 - fullStars) >= 0.5;

  

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
          },1000); 
      
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
    const rating = details?.vote_average?.toString().substring(0,3) / 2;
    const creatorText = mediaType === 'tv' ? 'Created by' : 'Directed by'; 
    const itemID = details.id;
        
        const [hasErrorPoster, setHasErrorPoster] = useState(false);

        const handleImageErrorPoster = () => {
            setHasErrorPoster(true);
        };

        const [hasErrorActor, setHasErrorActor] = useState(false);

        const handleImageErrorActor = () => {
            setHasErrorActor(true);
        };

        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);


          

          const getReviewCount = async () => {
            try {
              const db = getFirestore();
              const colRef = collection(db, "reviews");
              const snapshot = await getDocs(colRef);
              const reviewCount = snapshot.docs.length;
              return reviewCount;
            } catch (error) {
              console.error("Error getting review count:", error);
              return 0;
            }
          };

          const handleReviewSubmission = async () => {
            const reviewCount = await getReviewCount();
            const updatedReviewId = reviewCount + 1;
            const updatedReview = { ...newReview, reviewId: updatedReviewId };
            handleSubmitReview(updatedReview);
          };

          const handleChange = (event) => {
            const { value } = event.target;
            if (value.length <= maxLength) {
            setText(value);
            }

            setText(event.target.value);
          };

          

          useEffect(() => {
            if (details) {
              const mediaID = details.id; // Replace with the actual itemId
          
              const db = getFirestore();
              const colRef = collection(db, 'reviews');
              const q = query(colRef);
          
              const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedEntries = snapshot.docs
                  .filter((doc) => doc.data().itemId === mediaID)
                  .map((doc) => ({ ...doc.data(), id: doc.id }));
                setEntries(fetchedEntries);
                console.log(entries);
              }, (error) => {
                console.error('Error fetching entries:', error);
              });
          
              return () => {
                // Unsubscribe from the real-time listener when the component unmounts
                unsubscribe();
              };
            }
          }, [details]);
          
          
          const handleLike = async (reviewId) => {
            try {
              const db = getFirestore();
              const userRef = doc(db, 'users', user.uid);
          
              // Check if the user has already liked the review
              const userSnapshot = await getDoc(userRef);
              const likedReviews = userSnapshot.data().likedReviews || [];
              if (likedReviews.includes(reviewId)) {

                return true;
              }
          
              // Add the reviewId to the likedReviews array in the user document
              const updatedLikedReviews = [...likedReviews, reviewId];
              await updateDoc(userRef, {
                likedReviews: updatedLikedReviews,
              });
          
              // Increment the likes count by 1 in the review document
              const reviewRef = doc(db, 'reviews', reviewId);
              const docSnapshot = await getDoc(reviewRef);
              const currentLikes = docSnapshot.data().likes;
              const updatedLikes = currentLikes + 1;
              await updateDoc(reviewRef, {
                likes: updatedLikes,
              });

          
              console.log('Review liked successfully');
            } catch (error) {
              console.error('Error liking review:', error);
            }
          };

          

          const handleDislike = async (reviewId) => {
            try {
              const db = getFirestore();
              const userRef = doc(db, 'users', user.uid);
          
              // Check if the user has already liked the review
              const userSnapshot = await getDoc(userRef);
              const likedReviews = userSnapshot.data().likedReviews || [];
              if (!likedReviews.includes(reviewId)) {
                return;
              }
          
              // Remove the reviewId from the likedReviews array in the user document
              const updatedLikedReviews = likedReviews.filter((id) => id !== reviewId);
              await updateDoc(userRef, {
                likedReviews: updatedLikedReviews,
              });
          
              // Decrement the likes count by 1 in the review document
              const reviewRef = doc(db, 'reviews', reviewId);
              const docSnapshot = await getDoc(reviewRef);
              const currentLikes = docSnapshot.data().likes;
              const updatedLikes = currentLikes - 1;
              await updateDoc(reviewRef, {
                likes: updatedLikes,
              });

              setLikedStatus(false);
          
              console.log('Review disliked successfully');
            } catch (error) {
              console.error('Error disliking review:', error);
            }
          };

          useEffect(() => {
            if (user == null){
                return;
            }
            const hasLikedReview = (reviewId) => {
                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);
              
                return getDoc(userRef)
                  .then((userSnapshot) => {
                    const likedReviews = userSnapshot.data().likedReviews || [];
                    return likedReviews.includes(reviewId);
                  })
                  .catch((error) => {
                    console.error('Error checking if review is liked:', error);
                    return false; // Return false if there's an error to avoid unexpected behavior
                  });
              };

              hasLikedReview()

          },[likedStatus])

        
          
          
          

          const deleteEntry = async (reviewId) => {
            try {
              const db = getFirestore();
              const reviewRef = doc(db, 'reviews', reviewId);
          
              await deleteDoc(reviewRef);
          
              console.log('Review deleted successfully');
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          };


        const handleCopyToClipboard = () => {
            const currentUrl = window.location.href;
        
            navigator.clipboard.writeText(currentUrl)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                setCopied(false);
                }, 1000); // Display the message for 3 seconds
                console.log('URL copied to clipboard:', currentUrl);
            })
            .catch((error) => {
                console.error('Failed to copy URL to clipboard:', error);
            });
        };
          
        const handleLoadMoreReviews = () => {
            setReviewNum(reviewNum + 4);
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

        
                    <div className="backdrop" style={{border: "none", display: "flex", justifyContent: "center", background: `linear-gradient(to right, transparent 40%, #14171d 90%), linear-gradient(to left, transparent 40%, #14171d 90%), url(${IMAGES + details.backdrop_path}) no-repeat center center / cover`}}>

                        
                    </div>

                    <div className="details-text">

                
                        <div className="details-name">
                            <h1>{itemName} <span>{details.tagline && details.tagline}</span></h1>
                            
                            <div className="star-rating">
                                {[...Array(totalStars)].map((_, index) => (
                                    <span
                                    key={index}
                                    className={`star ${index < fullStars ? 'gold' : index === fullStars && hasHalfStar ? 'gold' : 'blue'}`}
                                    >
                                    {index < fullStars ? (
                                        <span className="star-icon full"><TbStarFilled/></span>
                                    ) : index === fullStars && hasHalfStar ? (
                                        <span className="star-icon half"><TbStarHalfFilled/></span>
                                    ) : (
                                        <span className="star-icon-empty"><TbStarFilled/></span>
                                    )}
                                    </span>
                                ))}

                                <p>{rating}</p>
                            
                            </div>

                        </div>
                        <h2><span>{airDateText}</span> {airDate}</h2>
                        <h3><span>{mediaType === "tv" ? 'Created by: ' : 'Director: '}</span> {createdBy} dywavdyawvdyvawy</h3>
                        <p>{overview}</p>



                        

                    </div>
    
                 
                    <div className="details-info">
                        <div className="details-image-div">
                            <img src={hasErrorPoster ? notfound : IMAGES + imagePath} onError={handleImageErrorPoster} alt="" />   
    
                            <div className="rate-review">
                                <div className="star-rating">
                                    {[...Array(totalStars)].map((_, index) => (
                                        <span
                                        key={index}
                                        className={`star ${index < fullStars ? 'gold' : index === fullStars && hasHalfStar ? 'gold' : 'blue'}`}
                                        >
                                        {index < fullStars ? (
                                            <span className="star-icon full"><TbStarFilled/></span>
                                        ) : index === fullStars && hasHalfStar ? (
                                            <span className="star-icon half"><TbStarHalfFilled/></span>
                                        ) : (
                                            <span className="star-icon-empty"><TbStarFilled/></span>
                                        )}
                                        </span>
                                    ))}

                                    <p>{rating}</p>
                                
                                </div>

                                <div className='hori-line'></div>


                                <div className="icon-features">
                                    <AiOutlinePlus className='icon plus'/>
                                    <MdWatchLater className='icon watch'/>
                                </div>

                                <div className='hori-line'></div>


                                <div className="additional-features">
                                    <Link to={user != null ? (`../${mediaType === "movie" ? "movies" : "television"}/write-review/${id}`) : "../../auth/login"}>
                                        <div className='feature-element'>
                                            <h1>Write a review</h1>
                                        </div>
                                    </Link>
                                    <div className='feature-element last' onClick={handleCopyToClipboard}><h1 >Share</h1></div>
                                    {copied && <div className="clipboard-text"><h1>Copied to clipboard!</h1></div>}

                                </div>

                                

                                
                            </div>
                        </div>
                        <div className="details-text">

                
                            <div className="details-name">
                                <h1>{itemName} {details.tagline && <span>"{details.tagline}"</span>}</h1>

                            </div>
                            <h2><span>{airDateText}</span> {airDate}</h2>
                            <h3><span>{mediaType === "tv" ? 'Created by: ' : 'Director: '}</span> {createdBy}</h3>
                            <p>{overview}</p>
                            <div className="star-rating">
                                {[...Array(totalStars)].map((_, index) => (
                                    <span
                                    key={index}
                                    className={`star ${index < fullStars ? 'gold' : index === fullStars && hasHalfStar ? 'gold' : 'blue'}`}
                                    >
                                    {index < fullStars ? (
                                        <span className="star-icon full"><TbStarFilled/></span>
                                    ) : index === fullStars && hasHalfStar ? (
                                        <span className="star-icon half"><TbStarHalfFilled/></span>
                                    ) : (
                                        <span className="star-icon-empty"><TbStarFilled/></span>
                                    )}
                                    </span>
                                ))}

                                <p>{rating}</p>
                            
                            </div>
                            <Link to={user != null ? (`../${mediaType === "movie" ? "movies" : "television"}/write-review/${id}`) : "../../auth/login"}>
                                <button>Write a Review</button>
                            </Link>



                            
    
                            <div className="actors">
                                {crew?.cast?.slice(0, 6).map((actor) => {
                                    const imagePath = actor.profile_path ? IMAGES + actor.profile_path : notfound;
                                    return (
                                    <div className="actors-div" key={actor.id}>
                                        <Link to={`../../actor/${actor.id}`}>
                                        <img src={imagePath} alt="" onError={(e) => e.target.src = notfound} />
                                        </Link>
                                        <h1>{actor.name}</h1>
                                        <p className="actor-character-name">{actor.character}</p>
                                    </div>
                                    );
                                })}
                            </div>

                            
                            
                        </div>
                    </div>



                    
                    <div style={{display: entries.length === 0 ? "none" : "flex"}} className="details-reviews-container">

                        <h1>Recent Reviews</h1>

                        <div className="details-reviews-map">

                            

                            {entries.length > 0 && entries.map(item => {
                                return <div key={item.reviewID} className="review-input">
                                    <div className="left-side">
                                        <div className="rating-box">
                                            <div className={
                                                ((item.plotRating + item.enjoymentRating + item.cinematographyRating + item.actingRating) / 4 > 4)
                                                    ? "score-box green"
                                                    : ((item.plotRating + item.enjoymentRating + item.cinematographyRating + item.actingRating) / 4 > 3)
                                                    ? "score-box yellow"
                                                    : "score-box red"
                                                }>
                                                <p>Overall</p>
                                                <h1>{(item.plotRating + item.enjoymentRating + item.cinematographyRating + item.actingRating)/4}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                        <div className="review-info">
                                            <p>{item.date}</p>
                                            
                                        </div>
                                        <div className="review-text">
                                            <p>{item.review}</p>
                                        </div>
                                        <div className="review-scores">
                                            <div className="plot-score">
                                                <h1>Plot/Storytelling</h1>
                                                <div className="plot-score-stars">
                                                    {[...Array(totalStars)].map((_, index) => (
                                                        <span
                                                        key={index}
                                                        className={`star ${index < item.plotRating ? 'gold' : null}`}
                                                        >
                                                        {index < item.plotRating ? (
                                                            <span className="star-icon full"><TbStarFilled/></span>
                                                        ) : (
                                                            <span className="star-icon-empty"><TbStarFilled/></span>
                                                        )}
                                                        </span>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className="plot-score">
                                                <h1>Performances</h1>
                                                <div className="plot-score-stars">
                                                    {[...Array(totalStars)].map((_, index) => (
                                                        <span
                                                        key={index}
                                                        className={`star ${index < item.actingRating ? 'gold' : null}`}
                                                        >
                                                        {index < item.actingRating ? (
                                                            <span className="star-icon full"><TbStarFilled/></span>
                                                        ) : (
                                                            <span className="star-icon-empty"><TbStarFilled/></span>
                                                        )}
                                                        </span>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className="plot-score">
                                                <h1>Cinematography</h1>
                                                <div className="plot-score-stars">
                                                    {[...Array(totalStars)].map((_, index) => (
                                                        <span
                                                        key={index}
                                                        className={`star ${index < item.cinematographyRating ? 'gold' : null}`}
                                                        >
                                                        {index < item.cinematographyRating ? (
                                                            <span className="star-icon full"><TbStarFilled/></span>
                                                        ) : (
                                                            <span className="star-icon-empty"><TbStarFilled/></span>
                                                        )}
                                                        </span>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className="plot-score">
                                                <h1>Enjoyability</h1>
                                                <div className="plot-score-stars">
                                                    {[...Array(totalStars)].map((_, index) => (
                                                        <span
                                                        key={index}
                                                        className={`star ${index < item.enjoymentRating ? 'gold' : null}`}
                                                        >
                                                        {index < item.enjoymentRating ? (
                                                            <span className="star-icon full"><TbStarFilled/></span>
                                                        ) : (
                                                            <span className="star-icon-empty"><TbStarFilled/></span>
                                                        )}
                                                        </span>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-info">
                                        <div className="likes">
                                            {user && item.userId === user.uid ? <AiOutlineDelete onClick={() => deleteEntry(item.reviewId)} className='garbage'/> : null}
                                            <IoIosArrowUp onClick={() => handleLike(item.reviewId)} className="like"/>
                                            <p>{item.likes}</p>
                                            <IoIosArrowDown onClick={() => handleDislike(item.reviewId)} className="dislike"/>

                                                
                                            </div>

                                        <h1>{item.username}</h1>
                                        <img src={item.userImage}/>
                                    </div>
                                    <div className="tags">
                                        {item.tags.map(item => {
                                            return <div key={item} className='tag-box'>
                                                    {item}
                                                </div>
                                        })}
                                    </div>
                                </div>
                            })}
                            
                        </div>

                        {entries.length > (4 + reviewNum) && (
                            <button onClick={handleLoadMoreReviews()} className="load-more-button">Load more</button>
                        )}
                        

                        
                    </div>
    
                    <div className="similar-movies">
                        {mediaType === "tv" && similarTV.length > 0 ? <h1>Recommended TV Shows</h1> : null}
                        {mediaType === "movie" && similarMovies.length > 0 ? <h1>Recommended Movies</h1> : null}


    

                        {mediaType === 'tv' &&  (
                            <div className="similar-movies-map" key={"a"}>
                                {similarTV.length > 0 && similarTV?.slice(0,8).map((tv) => {
                                    return <TvItem image={tv.poster_path} title={tv.name} year={similarTV?.first_air_date?.substring(0,4) === similarTV?.last_air_date?.substring(0,4) ? " present" : similarTV?.last_air_date?.substring(0,4)} id={tv.id} type={"tv"}/>
                                })}
                            </div>
                        )}

                        {mediaType === 'movie' && (
                            <div className="similar-movies-map" key={"a"}>
                                {similarMovies.length > 0 && similarMovies?.slice(0,8).map((movie) => {
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