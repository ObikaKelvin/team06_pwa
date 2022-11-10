// import {NewReport} from '/src/js/models/NewReport.js';
// import {ReportCategory} from '/src/js/models/ReportCategory.js';
// import {addNewReport, getCategory,addNewReportCategory} from '/src/js/index1.js';

// const reportDetails=document.getElementById("reportDetails_1");
// const newReport= new NewReport();


// reportDetails.addEventListener('click',(e)=>{
//   e.preventDefault();

//     //input value
//     let title=document.getElementById('reportTitle').value;
//     let category=document.getElementById('reportCategory').value;
//     let description=document.getElementById('reportDesc').value;
//     // let evidence=document.getElementById('reportEvidence');
//     // console.log('title: '+title);
//     // console.log('category: '+category);
//     // console.log('description: '+description);

//     //set values in report object
//     newReport.setTitle=title;
//     newReport.setCategory=category;
//     newReport.setDescription=description;
//     let date=new Date();
//     newReport.setCreatedAt=date;
//     newReport.setStatus='Pending';

//     console.log(newReport.getTitle);
// console.log(newReport.getCategory);
// console.log(newReport.getDescription);
// console.log(newReport.getCreatedAt);
// console.log(newReport.getStatus);

//  document.querySelector('form').reset()

// })

// let reportLocationDetails=document.getElementById("reportDetails_2");

// reportLocationDetails.addEventListener('click',()=>{

//     //input value
//     let address=document.getElementById('reportAddress').value;
//     // let location=document.getElementById('reportLocation').value;
//     // console.log('address: '+address);
//     // console.log('location: '+location);
//     newReport.setAddress=address;
//     // newReport.setLocation=location;
//     console.log(newReport.getAddress);
//  console.log(newReport.getLocation);

// })


// let submitReport=document.getElementById('newReportSubmit')
// // submit report
//  submitReport.addEventListener('click',async (e)=>{

//     // get category and new report ids
//   const newReportData=await addNewReport(newReport);
//   const categoryId=await getCategory('categories','name',newReport.getCategory);

//   console.log('newReportId: '+newReportData.id);
//   console.log('categoryId: '+categoryId);

//   if(newReportData!=null&&categoryId!=null){
//    let newReportId=newReportData.id;

//  // create ReportCatergory object
//   let reportCategoryRef=new ReportCategory();
//   reportCategoryRef.setCategoryId=categoryId;
//   reportCategoryRef.setCreatedAt=new Date();
//   reportCategoryRef.setReportId=newReportId;

//   //save ReportCatergory object
//    await addNewReportCategory(reportCategoryRef)
//   console.log("reportCategoryRef:"+reportCategoryRef)

//   }
//     console.log(newReport)
    
// })