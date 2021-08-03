class ClubMember {
    constructor(id, clubid, clubname, user, firstname, lastname, phonenumber, pushToken){
        this.id = id;
        this.clubid = clubid;
        this.clubname = clubname;
        this.user = user;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.pushToken = pushToken;
    }
}

export default ClubMember;