class User {
    constructor(id, email, isTeacher, firstname, lastname, phonenumber, pushToken){
        this.id = id;
        this.email = email;
        this.isTeacher = isTeacher;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.pushToken = pushToken;
    }
}

export default User;