

import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import banner from "../img/banner11.jpg"
import {useAuthState} from "react-firebase-hooks/auth"
import { authFirebase } from '../../utils/firebase';
import {AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlineCheckCircle} from "react-icons/ai"
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import {IoIosArrowRoundBack} from "react-icons/io"
import {getFirestore, doc, collection, getDocs, addDoc, deleteDoc, query, where, updateDoc, getDoc, onSnapshot} from "firebase/firestore"



const WriteReview = () => {



    const[user, loading] = useAuthState(authFirebase);

    const {id} = useParams();
    const[details, setDetails] = useState([]);
    const {pathname} = useLocation();
    const mediaType = pathname.includes("television") ? "tv" : "movie";
    const IMAGES = "https://image.tmdb.org/t/p/original"
    const imagePath = details.backdrop_path;


    const [activeTab, setActiveTab] = useState('scores');

    const [lineOne, setLineOne] = useState(false);

    const [text, setText] = useState('');
    const maxLength = 300;

    const handleChange = (event) => {
      const { value } = event.target;
      if (value.length <= maxLength) {
        setText(value);
      }

      setText(event.target.value);
    };

    const tags = [
      "Entertaining",
    "Gripping",
    "Thrilling",
    "Thought-provoking",
    "Heartwarming",
    "Mind-bending",
    "Suspenseful",
    "Action-packed",
    "Hilarious",
    "Emotional",
    "Captivating",
    "Intriguing",
    "Engaging",
    "Visually stunning",
    "Fast-paced",
    "Epic",
    "Unique",
    "Unpredictable",
    "Funny",
    "Heartbreaking",
    "Inspiring",
    "Beautifully shot",
    "Witty",
    "Chilling",
    "Mind-blowing",
    "Artistic",
    "Relatable",
    "Unforgettable",
    "Well-written",
    "Must-watch",
    "Timeless",
    "Masterpiece",
    ];

    const [clickedTags, setClickedTags] = useState([]);
    const [clickedTagsCount, setClickedTagsCount] = useState(0);

    const handleTagClick = (tag) => {
      if (clickedTagsCount < 3){

        if (clickedTags.includes(tag)) {
          setClickedTags(clickedTags.filter((clickedTag) => clickedTag !== tag));
          setClickedTagsCount(clickedTagsCount - 1);
        } else {
          setClickedTags([...clickedTags, tag]);
          setClickedTagsCount(clickedTagsCount + 1);
        }
      }
      else{
        if (clickedTags.includes(tag)) {
          setClickedTags(clickedTags.filter((clickedTag) => clickedTag !== tag));
          setClickedTagsCount(clickedTagsCount - 1);
        }
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
          username : username,
          plotRating: selectedStarsA,
          actingRating: selectedStarsB,
          cinematographyRating: selectedStarsC,
          enjoymentRating: selectedStarsD,
          tags : clickedTags,
          itemPicture : details.poster_path,
          mediaType : mediaType
      };

        setActiveTab("done");

         
        // Update the review with the generated review ID and username
    
        const db = getFirestore();
        const docRef = await addDoc(collection(db, "reviews"), newReview);
        const reviewId = docRef.id;
    
        // Update the review with the generated review ID
        await updateDoc(docRef, { reviewId: reviewId });
    
        // Clear the textarea or perform any other necessary actions
        setText("");
      } catch (error) {
        console.error("Error adding review:", error);
      }
    };

    

    




    const [hoveredStarsA, setHoveredStarsA] = useState(0);
    const [selectedStarsA, setSelectedStarsA] = useState(0);

    const [hoveredStarsB, setHoveredStarsB] = useState(0);
    const [selectedStarsB, setSelectedStarsB] = useState(0);

    const [hoveredStarsC, setHoveredStarsC] = useState(0);
    const [selectedStarsC, setSelectedStarsC] = useState(0);

    const [hoveredStarsD, setHoveredStarsD] = useState(0);
    const [selectedStarsD, setSelectedStarsD] = useState(0);

    const [windowPosition, setWindowPosition] = useState(0); 
    const [buttonActive, setButtonActive] = useState(false);

    const handleActiveTab  = (tab) => {
      setActiveTab(tab);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setWindowPosition(0);
  }

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

    const handleWindowPosition  = (prevPosition) => {

      if (selectedStarsD != 0){
        return;
      }

      setWindowPosition((prevPosition) => prevPosition + 50); 
      window.scrollTo({
        top: windowPosition + 50,
        behavior: 'smooth',
      });
    }

    

    const handleStarClickA = (starIndex) => {
      setSelectedStarsA(starIndex);
      setBlurB(false);
      handleWindowPosition(windowPosition)
      
     

    };
    const handleStarClickB = (starIndex) => {
      setSelectedStarsB(starIndex);
      setBlurC(false);
      handleWindowPosition(windowPosition)

      
      
    };

    const handleStarClickC = (starIndex) => {
      setSelectedStarsC(starIndex);
      setBlurD(false);
      handleWindowPosition(windowPosition)



    };

    const handleStarClickD = (starIndex) => {
      setSelectedStarsD(starIndex);
      handleWindowPosition(windowPosition)
      setButtonActive(true);


    };

    const [blurB, setBlurB] = useState(true);
    const [blurC, setBlurC] = useState(true);
    const [blurD, setBlurD] = useState(true);


    const onFormSubmit = () => {
      return;
    }

   

  return (
    <div className='write-review'>
        <Nav/>

        
        <div className="image-component">
            <img src={IMAGES + imagePath}/>
            <p>Write a review for:<span>{details.title || details.name}</span></p>
            
        </div>
        <div className="rating-component">

          {activeTab === 'scores' && (

          <React.Fragment>

            <div className="progress-bar">
              <div className="circle active">
                <h1>1</h1>
              </div>
              <div className="line">
                <div className="line-icon"></div>
              </div>
              <div className="circle">
                <h1>2</h1>
              </div>
              <div className="line">
                <div className="line-icon"></div>
              </div>
              <div className="circle">
                <h1>3</h1>
              </div>
              
              
            </div>

            
            
            <div className="rating-input-container">
              <div className="rating-input">
                <div className="rating-input-info">
                  <h1>Rate the <span>plot / storyline</span></h1>
                  <p>The quality, originality, and engagement of the narrative.</p>
                </div>
                <div className="rating-input-score">
                {[...Array(5)].map((_, index) => {
                  const isFilled = index < selectedStarsA || index < hoveredStarsA;
                  return (
                    <span
                      key={index}
                      className={`star ${isFilled ? 'filled' : 'empty'}`}
                      onMouseEnter={() => setHoveredStarsA(index + 1)}
                      onMouseLeave={() => setHoveredStarsA(selectedStarsA)}
                      onClick={() => handleStarClickA(index + 1)}
                    >
                      {isFilled ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  );
                })}
                </div>
              </div>
              <div className={`rating-input ${blurB ? 'blurred' : ''}`}>
                <div className="rating-input-info">
                  <h1>Rate the <span>acting / performances</span></h1>
                  <p>The actors' portrayal of characters and their emotions.</p>
                </div>
                <div className="rating-input-score">
                {[...Array(5)].map((_, index) => {
                  const isFilled = index < selectedStarsB || index < hoveredStarsB;
                  return (
                    <span
                      key={index}
                      className={`star ${isFilled ? 'filled' : 'empty'}`}
                      onMouseEnter={() => setHoveredStarsB(index + 1)}
                      onMouseLeave={() => setHoveredStarsB(selectedStarsB)}
                      onClick={() => handleStarClickB(index + 1)}
                    >
                      {isFilled ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  );
                })}
                </div>
              </div>
              <div className={`rating-input ${blurC ? 'blurred' : ''}`}>
                <div className="rating-input-info">
                  <h1>Rate the <span>cinematography</span></h1>
                  <p>The visual storytelling through camera techniques and lighting.</p>
                </div>
                <div className="rating-input-score">
                {[...Array(5)].map((_, index) => {
                  const isFilled = index < selectedStarsC || index < hoveredStarsC;
                  return (
                    <span
                      key={index}
                      className={`star ${isFilled ? 'filled' : 'empty'}`}
                      onMouseEnter={() => setHoveredStarsC(index + 1)}
                      onMouseLeave={() => setHoveredStarsC(selectedStarsC)}
                      onClick={() => handleStarClickC(index + 1)}
                    >
                      {isFilled ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  );
                })}
                </div>
              </div>
              <div className={`rating-input ${blurD ? 'blurred' : ''}`}>
                <div className="rating-input-info">
                  <h1>Rate the <span>enjoyment</span></h1>
                  <p>How much the overall experience was enjoyable and entertaining.</p>
                </div>
                <div className="rating-input-score">
                {[...Array(5)].map((_, index) => {
                  const isFilled = index < selectedStarsD || index < hoveredStarsD;
                  return (
                    <span
                      key={index}
                      className={`star ${isFilled ? 'filled' : 'empty'}`}
                      onMouseEnter={() => setHoveredStarsD(index + 1)}
                      onMouseLeave={() => setHoveredStarsD(selectedStarsD)}
                      onClick={() => handleStarClickD(index + 1)}
                    >
                      {isFilled ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  );
                })}
                </div>
              </div>
            </div>
            

            <button className={buttonActive ? "button active" : "button inactive"} onClick={() => handleActiveTab("review")}>Next</button>


          </React.Fragment>
          )}

          {activeTab === "review" && (
            <React.Fragment>

              <div className="progress-container">
                
                <div className="progress-bar">
                  <div className="circle active">
                    <h1>1</h1>
                  </div>
                  <div className="line">
                    <div className="line-icon active"></div>
                  </div>
                  <div className="circle active">
                    <h1>2</h1>
                  </div>
                  <div className="line">
                    <div className="line-icon"></div>
                  </div>
                  <div className="circle">
                    <h1>3</h1>
                  </div>    
                
                </div>

                <div className="go-back" onClick={() => handleActiveTab("scores")}>
                    <IoIosArrowRoundBack className="back-icon"/>
                    <p>Return to scores</p>
                </div>
              </div>

              <div className="review-component-headers">
                <h1>Write a <span>review</span></h1>
                <p>Share your thoughts on <span>{details.title || details.name}</span>.</p>

                <form>
                  <textarea onChange={handleChange} value={text} maxLength={maxLength} placeholder="Write a review that's at least 50 characters.">
                    
                  </textarea>

                  {text.length < 50 && text.length >= 1 && <p style={{color: text.length < 50 ? "rgb(232, 101, 101)" : null}} className='character-remaining'>{50-text.length} more characters needed.</p>}
                  {text.length >= 300 && <p style={{color: 'white'}} className='character-remaining'>Maximum character limit reached.</p>}
                </form>
              </div>

              <button className={text.length >= 50 && text.length <= 300 ? "button active" : "button inactive"} onClick={() => handleActiveTab("tags")}>Next</button>


              
            </React.Fragment>
          )}

          {activeTab === "tags" && (
            <React.Fragment>
              <div className="progress-container">
                
                <div className="progress-bar">
                  <div className="circle active">
                    <h1>1</h1>
                  </div>
                  <div className="line">
                    <div className="line-icon active"></div>
                  </div>
                  <div className="circle active">
                    <h1>2</h1>
                  </div>
                  <div className="line">
                    <div className="line-icon active"></div>
                  </div>
                  <div className="circle active">
                    <h1>3</h1>
                  </div>


                
                </div>
                <div className="go-back" onClick={() => handleActiveTab("review")}>
                    <IoIosArrowRoundBack className="back-icon"/>
                    <p>Return to review</p>
                </div>




              </div>
              <div className="review-component-headers">
                <h1>Add <span>tags</span></h1>
                <p>Make your review stand out by attaching personalized tags. <span className='tag-span'>(Optional - up to 3 tags)</span></p>
                
              </div>

              <div className="tags-container">

                <div className="tags">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`tag-box ${clickedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <button className={"button active"} onClick={() => handleSubmitReview()}>Submit</button>


              
            </React.Fragment>
            
          )}

          {activeTab === "done" && (
            <React.Fragment>
                <AiOutlineCheckCircle className='check-icon'/>
                <p className='done-p'>Review successfully submitted!</p>
                <Link to={`../${mediaType === "movie" ? "movies" : "television"}/details/${id}`}>

                  <button className={"button active"}>Go back</button>
                </Link>

            </React.Fragment>
          )}


          
          
        </div>
        <Footer/>
    </div>
  )
}

export default WriteReview