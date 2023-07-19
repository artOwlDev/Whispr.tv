

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Nav } from '../components/Nav'
import axios from 'axios';
import Footer from '../components/Footer';
import {useAuthState} from "react-firebase-hooks/auth"
import { authFirebase } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {AiOutlineDelete, AiFillStar, AiOutlinePlus,AiFillHeart, AiOutlineClose, AiFillDislike, AiFillLike} from "react-icons/ai"
import { TvItem } from '../components/TvItem';
import { MovieSharp } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import {MdFavorite, MdWatchLater} from "react-icons/md"
import {BiTime} from "react-icons/bi"
import Loader from '../components/Loader';
import notfound from "../img/notfound.png";
import {getFirestore, doc, collection, getDocs, addDoc, deleteDoc, query, where, updateDoc, getDoc, onSnapshot} from "firebase/firestore"





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
    const mediaType = pathname.includes("television") ? "tv" : "movie";
    const [hoveredStars, setHoveredStars] = useState(0);
    var director = "";
    const [isLoading, setIsLoading] = useState(true);
    const [entries, setEntries] = useState([]); 

    const [showReviewBox, setShowReviewBox] = useState(false);
    const [boxTop, setBoxTop] = useState('80%');
    const [boxLeft, setBoxLeft] = useState('50%');
    let boxHeight;
    let boxWidth;
    const boxRef = useRef(null);

    const [text, setText] = useState('');
    const maxLength = 300;

    const [copied, setCopied] = useState(false);

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
    const itemID = details.id;

    const handleReviewClick = () => {

        if (!user){
           navigate("../../auth/login")
        }
        else{
            setShowReviewBox(!showReviewBox);
        }

    };


    useLayoutEffect(() => {
        const handleScroll = () => {
            const box = boxRef.current;
            if (box) {
              const windowHeight = window.innerHeight;
              const boxHeight = box.offsetHeight;
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
              const topPosition = scrollTop + (windowHeight - boxHeight) * 3/4 ;
              box.style.top = `${topPosition}px`;
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


        const handleSubmitReview = async () => {
            try {
                const dbUser = getFirestore();
                const userRef = doc(dbUser, 'users', user.uid);
                const userSnapshot = await getDoc(userRef);


                const userData = userSnapshot.data();
                const username = userData.username || ''; // If userna


              const newReview = {
                userId: user.uid,
                itemId: details.id,
                likes: 0,
                review: text,
                reviewId: '', // Placeholder value, it will be updated later
                userImage : user.photoURL,
                date: formattedDate,
                username : username
              };

               
              // Update the review with the generated review ID and username
          
              const db = getFirestore();
              const docRef = await addDoc(collection(db, "reviews"), newReview);
              const reviewId = docRef.id;
          
              // Update the review with the generated review ID
              await updateDoc(docRef, { reviewId: reviewId });
          
              // Clear the textarea or perform any other necessary actions
              setText("");
              setShowReviewBox(false);
            } catch (error) {
              console.error("Error adding review:", error);
            }
          };
          
          
          

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
                return;
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
          
              console.log('Review disliked successfully');
            } catch (error) {
              console.error('Error disliking review:', error);
            }
          };

        
          
          
          

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
                    <div className="review-box" ref={boxRef} style={{top: boxTop,left: boxLeft,height: `${boxHeight}px`,width: `${boxWidth}px`,}} >
                        <div className="review-box-container">
                            
                        </div>
                        <div className="icon-container">
                            <p>Write a review for: </p>
                            <AiOutlineClose className='close-icon' onClick={handleClosingReview}/>
                        </div>
                        <div className="review-box-item-text">
                            <h1>{itemName}</h1>
                            <p>({airDate})</p>
                        </div>
                        
                        <div className="review-box-user">
                            <img src={IMAGES + imagePath} alt="" />   
                            <form onSubmit={handleReviewSubmission} className="search-form">
                                <textarea onChange={handleChange} maxLength={maxLength} name="Text1" cols="40" rows="5" placeholder="Share your thoughts.." style={{resize: "none"}}  value={text}></textarea>

                                <p style={{color: text.length === 100 ? "rgb(237, 19, 19)" : "white"}} className='character-remaining'>{text.length}/{maxLength}</p>
                                
                            </form>

                        </div>


                        <div className="submit-container">
                            <p className="submit" onClick={handleSubmitReview}>Submit</p>
                        </div>
                    </div>
                    </>
                )}
                    <div className="backdrop" style={{border: "none", display: "flex", justifyContent: "center", background: `linear-gradient(to right, transparent 40%, #14171d 90%), linear-gradient(to left, transparent 40%, #14171d 90%), url(${IMAGES + details.backdrop_path}) no-repeat center center / cover`}}>

                        
                    </div>

                    <div className="details-text">

                
                        <div className="details-name">
                            <h1>{itemName}</h1>
                            {details.tagline && <span>"{details.tagline}"</span>}

                        </div>
                        <h2><span>{airDateText}</span> {airDate}</h2>
                        <h3><span>{mediaType === "tv" ? 'Created by: ' : 'Director: '}</span> {createdBy}</h3>
                        <p>{overview}</p>
                        <p><span className='rating-text'>Average rating:</span> <span style={{color: rating >= 7 ? "#66FF99" : rating > 5 ? "yellow" : "red"}}>{rating}</span> / 10</p>



                        <div className="actors">
                            {crew?.cast?.slice(0,4).map(actor => {
                                return <div key={actor.id} className='actors-div'>
                                    <Link to={`../../actor/${actor.id}`}>
                                        <img src={IMAGES + actor.profile_path} alt="" />
                                    </Link>
                                    <h1>{actor.name}</h1>
                                    <p className='actor-character-name'>{actor.character}</p>
                                </div>
                            })}
                        </div>

                    </div>
    
                 
                    <div className="details-info">
                        <div className="details-image-div">
                            <img src={hasErrorPoster ? notfound : IMAGES + imagePath} onError={handleImageErrorPoster} alt="" />   
    
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
                                    <div className='feature-element' onClick={handleReviewClick}><h1>Write a review</h1></div>
                                    <div className='feature-element'><h1>Add to list</h1></div>
                                    <div className='feature-element last' onClick={handleCopyToClipboard}><h1 >Share</h1></div>
                                    {copied && <div className="clipboard-text"><h1>Copied to clipboard!</h1></div>}

                                </div>

                                

                                
                            </div>
                        </div>
                        <div className="details-text">

                
                            <div className="details-name">
                                <h1>{itemName}</h1>
                                {details.tagline && <span>"{details.tagline}"</span>}

                            </div>
                            <h2><span>{airDateText}</span> {airDate}</h2>
                            <h3><span>{mediaType === "tv" ? 'Created by: ' : 'Director: '}</span> {createdBy}</h3>
                            <p>{overview}</p>
                            <p><span className='rating-text'>Average rating:</span> <span style={{color: rating >= 7 ? "#66FF99" : rating > 5 ? "yellow" : "red"}}>{rating}</span> / 10</p>

                            
    
                            <div className="actors">
                                {crew?.cast?.slice(0,12).map(actor => {
                                    return <div className='actors-div' key={actor.id}>
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



                    
                    <div style={{display: entries.length === 0 ? "none" : "flex"}} className="details-reviews-container">

                        <h1>Top Reviews</h1>

                        <div className="details-reviews-map">

                            {entries.length > 0 && entries.slice(0,6).map(item => {

                                return  <div key={entries.reviewID} className="details-review-input">
                                    

                                    <div className="top">
                                        <div className="left">
                                            <div className="userinfo">
                                                <img src={item.userImage} alt="" />
                                                <h1>{item.username}</h1>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="right">
                                            <p className='date'>{item.date}</p>
                                        </div>
                                    </div>

                                    <div className="bottom">
                                        <p className='review-text'>{item.review}</p>

                                        <div className="delete">
                                            {user && item.userId === user.uid ? <AiOutlineDelete onClick={() => deleteEntry(item.reviewId)} className='icon-delete'/> : null}
                                            
                                        </div>
                                        
                                        <div className="likes">
                                            <AiFillLike className='icon like' onClick={() => handleLike(item.reviewId)}/>
                                            <p>{item.likes}</p>
                                            <AiFillDislike className='icon dislike'onClick={() => handleDislike(item.reviewId)}/>
                                        </div>
                                    </div>
                                
                                </div>
                            })}
                        </div>



                        
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