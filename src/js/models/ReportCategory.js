export class ReportCategory{

    //setters
        set setCategoryId(value){
            this.categoryId = value;
        }
        set setCreatedAt(value){
            this.createdAt =value;
        }
        
        set setReportId(value){
            this.reportId =value;
        }
        set setUpdatedAt(value){
            this.reportId =value;
        }
    //getter
    get getCategoryId(){
        return this.categoryId;
     }
     get getCreatedAt(){
         return this.createdAt;
     }
     get getReportId(){
         return this.reportId;
     }
     get getUpdatedAt(){
         return this.updatedAt;
     }
        
    }