class User {
    constructor ( fullName, userName, email, photoUrl, role ) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.photoUrl = 'photoUrl';
        this.role = role || "customer";
    }
}

export default User;