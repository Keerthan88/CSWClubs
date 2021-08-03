class Meeting {
    constructor(id, description, clubid, clubname, memberemail, dateandtime){
        this.id = id;
        this.description = description;
        this.clubid = clubid;
        this.clubname = clubname;
        this.memberemail = memberemail;
        this.dateandtime = new Date(dateandtime);
    }
}

export default Meeting;