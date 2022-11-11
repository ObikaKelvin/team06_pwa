import location from "../services/location";
import { app, db } from '../services/firebase';
import { doc, getDocs, addDoc, collection, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Report from "../models/Report";

class ReportController {

    images = [];

    init = () => {
        this.setupEventListener();
        this.getCategories();
    }

    getCategories = async () => {
        const categories = await getDocs(collection(db, "categories"));
        // const queryStatement = query(collection(db, "categories"))
        // const categories = await getDocs(queryStatement);
        categories.forEach((category) => {

            console.log(category.id, " => ", category.data());
        });

        // console.log(categories);
    }

    setupEventListener = () => {
        document.querySelector("#camera--upload").addEventListener("click", this.cameraStart);
        document.querySelector("#camera--trigger").addEventListener("click", this.caputreImg);
        reportSubmit.addEventListener('click', this.createReport);
    }


    // Access the device camera and stream to cameraVie1w
    cameraStart = (e) => {
        document.querySelector("#camera").style.display = "flex";
        let track = null;
        const constraints = { video: { facingMode: "environment" }, audio: false };
        e.preventDefault();
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
                track = stream.getTracks()[0];
                document.querySelector("#camera--view").srcObject = stream;
            })
            .catch(function(error) {
                console.error("Oops. Something is broken.", error);
            });
    }

    caputreImg = (e) => {
        e.preventDefault();
        document.querySelector("#camera--sensor").width = document.querySelector("#camera--view").videoWidth;
        document.querySelector("#camera--sensor").height = document.querySelector("#camera--view").videoHeight;
        document.querySelector("#camera--sensor").getContext("2d").drawImage(document.querySelector("#camera--view"), 0, 0);
        const img = document.createElement('img');
        img.src = document.querySelector("#camera--sensor").toDataURL("image/webp");
        this.images.push(img.src);
        document.querySelector("#camera--output").append(img)
        document.querySelector("#camera").style.display = "none";
    }

    createReport = async (e) => {
        e.preventDefault();

        const title = document.querySelector("#title").value;
        const category = document.querySelector("#category").value;
        const categoryRef = doc(db, 'categories', category);
        const description = document.querySelector("#description").value;
        const address = document.querySelector("#address").value;
        const locationDetails = document.querySelector("#locationDetails").value;

        
        const auth = getAuth();
        let uid = null
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                uid = user.uid;
                const userRef = doc(db, 'users', uid);
                const postedBy = userRef;
                console.log(postedBy)

                const { latitude, longitude } = location;
                const report = new Report (title, description, address, locationDetails, categoryRef, postedBy, latitude, longitude);

                await Promise.all(this.images.map( async (image) => {
                    // Create a root reference
                    const storage = getStorage(app, "gs://the-citizen-d6e2b.appspot.com/");

                    // Create a reference to 'mountains.jpg'
                    const mountainsRef = ref(storage, "images11");

                    // 'file' comes from the Blob or File API
                    await uploadString(mountainsRef, image, 'data_url');
                    console.log('Uploaded a blob or file!');
                    report.images.push(`https://firebasestorage.googleapis.com/v0/b/the-citizen-d6e2b.appspot.com/o/${mountainsRef.name}?alt=media`)
                    console.log(report.images)
                }))

                const createdReport = await addDoc(collection(db, "reports"), Object.assign({}, report))
                window.location.href = "./report-success.html";
                // ...
            } 
        });

        
    }

}

export default ReportController;