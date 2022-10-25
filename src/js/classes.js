const { Timestamp } = require("firebase/firestore");

class Report{
    constructor(address, createdAt, description, images, location, postedBy, status, title, updatedAt, upvotes){
        this.address = address;
        this.createdAt = this.getDate(createdAt);
        this.description = description;
        this.images = images;
        this.location = location;
        this.postedBy = postedBy;
        this.status = status;
        this.title = title;
        this.updatedAt = updatedAt;
        this.upvotes = upvotes;
    }
    getDate(createdAt){
        let newDate = new Timestamp(createdAt.seconds ,createdAt.nanoseconds);
        return newDate.toDate();
    }
}
module.exports.Report = Report;