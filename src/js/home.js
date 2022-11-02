import { getCategories } from '/js/index.js'

// show reports by filters
let reportArrays=await getCategories('categories','name','park');
for(let report of reportArrays.values()){  
}


// show all reports
let reportMap=await getCategories('categories');
for(let report of reportMap.values()){
    console.log('address: '+report.address)
}