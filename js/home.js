
import { getCategories } from '/js/index.js'

// // show reports by filters
let reportArrays=await getCategories('categories','name','park');
for(let report of reportArrays.values()){ 
    console.log('category: '+report.category) 
    console.log('Title: '+ report.title)
    console.log('Address: '+ report.address)
    console.log('Created At: '+new Date(report.createdAt.seconds*1000).toLocaleString())

}


// show all reports
// let reportMap=await getCategories('categories');
// for(let report of reportMap.values()){
//     console.log('Title:'+ report.title)
//     console.log('Address:'+ report.address)
//     // console.log('Created At'+new Date(report.createdAt.seconds*1000).toLocaleString())
// }