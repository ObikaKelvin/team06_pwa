import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'
import 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
import Report from '/src/js/classes.js';
 import * as geofirestore from 'https://unpkg.com/geofirestore/dist/geofirestore.js'
const firebaseConfig = initializeApp({
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

function getCollectionFromName(name) {
  return collection(db, name);
}

let latestReports = []
export function getReports() {
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
let coordinates = []
function getUserLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      coordinates = [position.coords.latitude, position.coords.latitude];
      console.log(coordinates)
      return coordinates;
    })
  }
  else {
    return coordinates;
  }
}
getUserLocation()
function getNearestReports() {
  // get user location  
  let userLocation=getUserLocation();
  if(userLocation===null){
    return coordinates ;
  }
  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(db);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('reports');

  // Create a GeoQuery based on a location
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(userLocation[0], userLocation[1]), radius: 0 });

  // Get query (as Promise)
  query.get().then((value) => {
    //get value
  })
    .catch(err => {
    })
}
 getNearestReports();
var script = document.getElementById('second');
script.setAttribute("src", script.getAttribute("data-src"));
script.removeAttribute("data-src");
