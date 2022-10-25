import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, snapshot
  } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAdZBkcMY0QDKR6vkdC0kSDr5j8ekVH4_k",
    authDomain: "the-citizen-d6e2b.firebaseapp.com",
    projectId: "the-citizen-d6e2b",
    storageBucket: "the-citizen-d6e2b.appspot.com",
    messagingSenderId: "354032824353",
    appId: "1:354032824353:web:308a097b92191146e9f360",
    measurementId: "G-PLD04JLWCB"
  };

initializeApp(firebaseConfig);

const db = getFirestore()
getReports();


export function getCollectionFromName(name){
  return collection(db, name);
}

export function getReports(){
  const reportDb = getCollectionFromName('reports');
  getDocs(reportDb)
    .then(snapshot => {
      console.log(snapshot.docs);
      let latestReports = []
      snapshot.docs.forEach(doc => {
        var requireFile = require("./js/classes");
        let report = new requireFile.Report(doc.data().address, doc.data().createdAt, doc.data().description, doc.data().images, doc.data().location, doc.data().postedBy, doc.data().status, doc.data().title, doc.data().updatedAt, doc.data().upvotes)
        latestReports.push(report);
      })
      console.log(latestReports);
    })
    .catch(err => {
      console.log(err.message)
    })  
}
