import { getCategories } from './index1.js'

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

// show all reports
function showReports(reportArrays)
{
    const container=document.getElementById('cards')
    let output='';
 
    // retreive reports
     for(let report of reportArrays.values()){ 
         console.log('report.category:'+report.category) 
         console.log('report image:'+report.images.toLowerCase())
         let image=report.images.toLowerCase();
        //  let imageUrl=`./assets/images/${report.category}.jpg`;
         let imageUrl=`./assets/images/${image}`;
 
         output+=`<div class="card">
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
     }
 
     // show output
     container.innerHTML=output;
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
 