export class Report{
    constructor(address, createdAt, description, images, postedBy, status, title, updatedAt, upvotes, comments, geohash,category){
        this.address = address;
        this.createdAt =createdAt;
        this.description = description;
        this.images = images;
        this.postedBy = postedBy;
        this.status = status;
        this.title = title;
        this.updatedAt = updatedAt;
        this.comments = comments;
        this.upvotes = upvotes;
        this.geohash=geohash;
        this.category=category;
    }

}