import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import {  getFirestore,collection, getDocs, getDoc,doc,setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'
import 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
import Report from '/src/js/classes.js'; 
// import * as geofirestore from 'https://unpkg.com/geofirestore/dist/geofirestore.js'
const firebaseConfig =initializeApp( {
    apiKey: "AIzaSyAdZBkcMY0QDKR6vkdC0kSDr5j8ekVH4_k",
    authDomain: "the-citizen-d6e2b.firebaseapp.com",
    projectId: "the-citizen-d6e2b",
    storageBucket: "the-citizen-d6e2b.appspot.com",
    messagingSenderId: "354032824353",
    appId: "1:354032824353:web:308a097b92191146e9f360",
    measurementId: "G-PLD04JLWCB"
    // databaseURL:"https://the-citizen-d6e2b.firebaseio.com"
  });


const db = getFirestore(firebaseConfig)  

function getCollectionFromName(name){
  return collection(db, name);
}

let latestReports = []
export function getReports(){
  const reportDb = getCollectionFromName('reports');
  getDocs(reportDb)
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        let report = new Report(doc.data().address, doc.data().createdAt, doc.data().description, doc.data().images, doc.data().location, doc.data().postedBy, doc.data().status, doc.data().title, doc.data().updatedAt, doc.data().upvotes)
        latestReports.push(report)
      })
    })
    return latestReports;  
    
}

// function getNearestReports(){
//   console.log('inNearest')
//   const reportDb = getCollectionFromName('reports');
//   // Create a GeoFirestore reference
// const GeoFirestore = geofirestore.initializeApp(db);
// console.log('geofirestore:'+ GeoFirestore)
// // Create a GeoCollection reference
// const geocollection = GeoFirestore.collection('reports');
// console.log('geocollection:' +geocollection)
// // Create a GeoQuery based on a location
// const query = geocollection.near({ center: new firebase.firestore.GeoPoint(40.7589, -73.9851), radius: 0 });
// console.log(query)
//  // Get query (as Promise)
// query.get().then((value) => {
// console.log("value");
//     })
//     .catch(err => {
//       console.log(err.message)
//     })  
// }
var script = document.getElementById('second');
script.setAttribute("src",script.getAttribute("data-src"));
script.removeAttribute("data-src");
