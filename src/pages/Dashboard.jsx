
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { authFirebase } from '../../utils/firebase'; 
import {useAuthState} from "react-firebase-hooks/auth"
import Footer from '../components/Footer';
import {TbStarFilled} from "react-icons/tb"
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {collection, getDocs, addDoc, deleteDoc, query, where, updateDoc, onSnapshot} from "firebase/firestore"
import {AiOutlineDelete} from "react-icons/ai"
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io"


const Dashboard = () => {

    const[user, loading] = useAuthState(authFirebase);
    const [activeTab, setActiveTab] = useState('reviews');
    const [username, setUsername] = useState("");
    const [entries, setEntries] = useState([]); 
    const IMAGES = "https://image.tmdb.org/t/p/original"



    const navigate = useNavigate();

    const handleActiveTab  = (tab) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        const handleDashboard = () => {
            if (!user){
               navigate("../../auth/login")
            }
        };
    


        const fetchUsername = async () => {
          try {
            if (user) {
              const db = getFirestore();
              const userRef = doc(db, 'users', user.uid);
              const userSnapshot = await getDoc(userRef);
    
              if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData && userData.username) {
                  setUsername(userData.username);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUsername();
        handleDashboard();
      }, []);

    useEffect(() => {
        document.title = `${username} | Whispr`;

    },[])

    useEffect(() => {
      
    
        const db = getFirestore();
        const colRef = collection(db, 'reviews');
        const q = query(colRef);
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedEntries = snapshot.docs
            .filter((doc) => doc.data().userId === user.uid)
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
      
    }, []);

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

  return (
    <div className='dashboard-page'>
        <Nav/>
        <div className="dashboard">
            <div className="dashboard-left">

                <div className="dashboard-userinfo">
                    <h1>Dashboard</h1>
                    <p style={{paddingBottom: "0.6rem"}}>{user ? user.email : null}</p>
                </div>

                <div className="dashboard-selections">
                    <a className={activeTab === "reviews" ? "active" : ""} href="#" onClick={() => handleActiveTab('reviews')}>Reviews</a>
                    <a className={activeTab === "account" ? "active" : ""} href="#" onClick={() => handleActiveTab('account')}>Account</a>
                </div>
            </div>

            <div className="dashboard-right">
                {activeTab === "reviews" && (
                    <div className='dashboard-right-div'>
                        <h1 style={{fontSize: "1rem", paddingBottom: "1rem"}}>Reviews</h1>
                        <h1 style={{fontSize: "2rem", paddingBottom: "0.4rem"}}>Review history: </h1>
                        <p>Signed in with: {user ? user.email : null}</p>

                        <div className="reviews-container">
                          {entries.length > 0 && entries.map(item => {
                                  return <div key={item.reviewID} className="review-input">
                                      <div className="left-side">
                                        <Link to={`../${item.mediaType === "movie" ? "movies" : "television"}/details/${item.itemId}`}>
                                            <img src={IMAGES + item.itemPicture}/>
                                        </Link>
                                          <div className="rating-box">
                                              <div className={
                                                  ((item.plotRating + item.enjoymentRating + item.cinematographyRating + item.actingRating) / 4 >= 4)
                                                      ? "score-box green"
                                                      : ((item.plotRating + item.enjoymentRating + item.cinematographyRating + item.actingRating) / 4 >= 3)
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
                                                      {[...Array(5)].map((_, index) => (
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
                                                      {[...Array(5)].map((_, index) => (
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
                                                      {[...Array(5)].map((_, index) => (
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
                                                      {[...Array(5)].map((_, index) => (
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


                    </div>


                )}

                {activeTab === 'account' && (
                    <div className='dashboard-right-div'>
                    <h1 style={{fontSize: "1rem", paddingBottom: "1rem"}}>Account</h1>
                    <h1 style={{fontSize: "2rem", paddingBottom: "0.4rem"}}>My Account</h1>
                    <p>Signed in with: {user.email}</p>

                    <button onClick={() => authFirebase.signOut() && navigate("/")}style={{marginTop: "2rem", borderRadius: "1rem", margin: "1rem 0px", background: "#2596be", fontSize: "1.2rem", padding: "10px"}}>Sign out</button>
                </div>
                )}
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Dashboard