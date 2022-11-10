import { getCategories } from '/src/js/index1.js'

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
         let imageUrl=`./assets/images/${report.category}.jpg`;
 
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


// show all reports
// let reportMap=await getCategories('categories');
// for(let report of reportMap.values()){
//     console.log('address: '+report.address)
// }