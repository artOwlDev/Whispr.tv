import React from 'react'
import { Nav } from '../components/Nav'
import {getFirestore, collection, getDocs, addDoc, deleteDoc} from "firebase/firestore"

const Reviews = () => {

    const db = getFirestore();
    const colRef = collection(db, 'reviews');
    getDocs(colRef).then((snapshot) => {
        let reviews = [];
        snapshot.docs.forEach((doc) => {
            reviews.push({...doc.data(), id: doc.id})
        })

        console.log(reviews);

    })
    .catch(err => {
        console.log(err.message);
    })


  return (

    <div className='review-page'>
        <Nav/>

        <form>
            <input name='text'></input>
            <input name='id'></input>
            <button type='submit'>dwiubduawbdu</button>
        </form>
    </div>
  )
}

export default Reviews