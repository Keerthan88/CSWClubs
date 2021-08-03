import Club from "../../model/Club";
import ClubMember from '../../model/ClubMember';

export const CREATE_CLUBS = 'CREATE_CLUBS';
export const GET_CLUBS = 'GET_CLUBS';
export const JOIN_CLUB = 'JOIN_CLUB';
export const GET_MEMBERS = 'GET_MEMBERS';

export const getClubs = (email, joinedclubs) =>{
    return async dispatch => {
        const response = await fetch('https://clubs-app-test.firebaseio.com/AvailableClubs.json', {
            method: 'GET'
        });
        const resData = await response.json();
        const loadedClubs = [];

        for(const key in resData){
            loadedClubs.push(
                new Club(key, resData[key].title, resData[key].owner, resData[key].description, resData[key].moderator, resData[key].firstname, resData[key].lastname, resData[key].phonenumber)
            );
        }
        dispatch({type: GET_CLUBS, clubs: loadedClubs, owner: email, joinedclubs: joinedclubs});

    };
};

export const createClubs =(title, owner, description, moderator, firstname, lastname, phonenumber)=>{

    return async dispatch =>{
        const response = await fetch('https://clubs-app-test.firebaseio.com/AvailableClubs.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                owner: owner,
                description: description,
                moderator: moderator,
                firstname: firstname,
                lastname: lastname,
                phonenumber: phonenumber
            })
            
        });
        const responseData = await response.json();
        dispatch({
            type: CREATE_CLUBS,
                clubData:{
                    id: responseData.name,
                    title: title,
                    owner: owner,
                    description: description,
                    moderator: moderator,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber
                }
        });
    };

};

export const joinClub =(clubid, clubname, useremail, firstname, lastname, phonenumber, pushToken)=>{

    return async dispatch =>{
        const response = await fetch('https://clubs-app-test.firebaseio.com/JoinedClubs.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clubid: clubid,
                clubname: clubname,
                useremail: useremail,
                firstname: firstname,
                lastname: lastname,
                phonenumber: phonenumber,
                pushToken: pushToken
            })
            
        });
        const responseData = await response.json();
        dispatch({
            type: JOIN_CLUB,
                memberData:{
                    id: responseData.name,
                    clubid: clubid,
                    clubname: clubname,
                    useremail: useremail,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber,
                    pushToken: pushToken
                }
        });
    };

};

export const getMembers = (email) =>{
    return async dispatch => {
        const response = await fetch('https://clubs-app-test.firebaseio.com/JoinedClubs.json', {
            method: 'GET'
        });
        const resData = await response.json();
        const loadedMembers = [];

        for(const key in resData){
            loadedMembers.push(
                new ClubMember(key, resData[key].clubid, resData[key].clubname, resData[key].useremail, resData[key].firstname, resData[key].lastname, resData[key].phonenumber, resData[key].pushToken)
            );
        }
        dispatch({type: GET_MEMBERS, members: loadedMembers, user: email});

    };
};