import { getCategories } from './index1.js';
export var reportDetails = [];

if(typeof status ===undefined)
{
    var status=0;
}





// get all the data
async function getAllReports()
 {
    let reportArray=await getCategories('categories');
    showReports(reportArray);
 }
 getAllReports();

// get reports
const categories=document.querySelectorAll('.filterIcon a')
console.log('categories:'+categories)
categories.forEach((e)=>{
    console.log('e:'+e.id)
    e.addEventListener('click',async ()=>{
        console.log("id clicked:"+e.id)
       await getReports(e.id);
    })
})

async function getReports(id){
    console.log('id: '+id)
    // get reports form firebase
    let reportArray=(id==='all')?await getCategories('categories'):await getCategories('categories','name',id);
    // get element to show result
    showReports(reportArray);
   
}
let ReportsArr = [];
// show all reports
function showReports(reportArrays)
{
    const container=document.getElementById('cards')
    let output='';
    let count=0;
 

    // Getting Keys of Reports and storing it to Array
    let keys = [];
    for(let key of reportArrays.keys())
    {
        keys.push(key);
        //console.log(`===***=== Category ID: = ${key}`);
  
    }


    // retreive reports
     for(let report of reportArrays.values()){ 
         
        ReportsArr.push(report);

            //console.log('report.category:'+report.category) 
            //console.log('report image:'+report.images.toLowerCase())
            let image = report.images.toLowerCase();
           //  let imageUrl=`./assets/images/${report.category}.jpg`;
            let imageUrl=`./assets/images/${image}`;
            //output+=`<div class="card" onClick="Transfer('${keys[i]}')" id="${keys[i]}">
            output+=`<div class="card" id=${count}>
                <img class="cardImg" src=${imageUrl} alt="img1">
                <div class="cardDetail">
                    <h3>${report.title}</h3>
                    <span class="location"><h4>${report.address}</h4></span>
                    <span class="time"><h4>${new Date(report.createdAt.seconds*1000).toLocaleString()}</h4></span>
                    <div class="tags">
                    <span class="filterIcon activeIcon clear"><a href="">${report.category}</a></span>                
                    </div>
                </div>
            </div>`;
            count++;

        // With using below for loop we are taking out ID from the array and assigning to DIV id of Card
        /*for (let i=0; i<keys.length; i++)
         {
            console.log('report.category:'+report.category) 
            console.log('report image:'+report.images.toLowerCase())
            let image=report.images.toLowerCase();
           //  let imageUrl=`./assets/images/${report.category}.jpg`;
            let imageUrl=`./assets/images/${image}`;
           
            //output+=`<div class="card" onClick="Transfer('${keys[i]}')" id="${keys[i]}">
                output+=`<div class="card" id=${count}>
                <img class="cardImg" src=${imageUrl} alt="img1">
                <div class="cardDetail">
                    <h3>${report.title}</h3>
                    <span class="location"><h4>${report.address}</h4></span>
                    <span class="time"><h4>${new Date(report.createdAt.seconds*1000).toLocaleString()}</h4></span>
                    <div class="tags">
                    <span class="filterIcon activeIcon clear"><a href="">${report.category}</a></span>                
                    </div>
                </div>
            </div>`;
            count++;
         }*/
         
     }
 
     // show output
     
     
 
       
        container.innerHTML=output;
        let allReportsDiv = document.querySelectorAll('.card');
        console.log(`All Reports Div: ${allReportsDiv}`);
        allReportsDiv.forEach((div)=>{
        div.addEventListener('click',()=>{
             //console.log(div.id);
             reportDetails.push(ReportsArr[div.id]);
             //console.log(ReportsArr[div.id]);
             localStorage.setItem("Report", JSON.stringify(ReportsArr[div.id]));
             window.location.href = "reportdetail.html";
             
             
            })
        })
   
     
}


// Map View
let mapView=document.getElementById('mapView')
let searchDiv=document.getElementById('search')
let mapDiv=document.getElementById('map')

mapView.addEventListener('click',()=>{
  
console.log('map View clicked')
    if(searchDiv.style.display==='none'&&mapDiv.style.display==='none')
    {
        mapView.innerHTML=''
        searchDiv.innerHTML=''
        const container=document.getElementById('cards')
        container.innerHTML=''
        searchDiv.style.display='inline'
        mapDiv.style.display='inline'
    }
    else{
        searchDiv.style.display='none'
        mapDiv.style.display='none'
    }

let center=[-123,49]
  
//search bar
var options = {
           searchOptions: {
               key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
               language: 'en-GB',
               limit: 5
           },
           autocompleteOptions: {
               key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
               language: 'en-GB'
           }
       };
       var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
       var searchBoxHTML = ttSearchBox.getSearchBoxHTML();  
       document.getElementById('search').prepend(searchBoxHTML);
       ttSearchBox.on('tomtom.searchbox.resultsfound', function (data) {
           console.log(data);

       });
       searchBoxHTML.addEventListener('click', () => {
           let value = ttSearchBox.getValue();
           try {
               if (value !== '') {
                   // save lat and long in dastabase
                   function callbackFn(result) {
                       console.log(result.results[0].position.lng);
                       console.log(result.results[0].position.lat);

                      let long = result.results[0].position.lng;
                      let lat = result.results[0].position.lat;
                       center=[long,lat]
                       console.log('long: ' + long)
                       console.log('center ' + center)
                       map();
                       getReportsForMapView(long,lat)

                   };
                   tt.services.geocode({
                       key: 'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
                       query: value
                   }).then(callbackFn);

               }
           }
           catch (e) {
               console.log(`error:` + e)
           }

       });
     
       function map()
       {
           console.log('center: '+center)
  const map= tt.map({
       key:'rggmSeIJsaufKzjETZpfOaQ54IGyXY4U',
       container: 'map',
       center:center,
       zoom:10
       // style:'tomtom://vector/1/basic-main'
   });
       }
 
       map();

    });

    //show result of mapview
    // get reports
async function getReportsForMapView(long,lat) {
    let categories = await getCategories('categories')
    const container = document.getElementById('cards')
    let output = '';
    for (let report of categories.values()) {
   console.log('fix '+Number(report.latitude).toFixed(1).toString())
   console.log('id '+report.title)

      if (lat.toFixed(1).toString()===report.latitude.toFixed(1).toString() &&
      long.toFixed(1).toString() === long.toFixed(1).toString()) {
          let image=report.images.toLowerCase();
          //  let imageUrl=`./assets/images/${report.category}.jpg`;
           let imageUrl=`./assets/images/${image}`;
        output += `<div class="card">
      <img class="cardImg" src=${imageUrl} alt="img1">
      <div class="cardDetail">
          <h3>${report.title}</h3>
          <span class="location"><h4>${report.address}</h4></span>
          <span class="time"><h4>${new Date(report.createdAt.seconds * 1000).toLocaleString()}</h4></span>
          <div class="tags">
              <span class="filterIcon activeIcon clear"><a href="">${report.category}</a></span>                
          </div>
      </div>
  </div>`;
      }
    }
    // show output
    container.innerHTML = output;
  }
 