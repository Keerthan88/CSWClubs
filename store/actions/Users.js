export const CREATE_USERS = 'CREATE_USERS';
import User from "../../model/User";
export const GET_USERS = 'GET_USERS';


export const getUsers =() =>{
    return async dispatch => {
        const response = await fetch('https://clubs-app-test.firebaseio.com/AllUsers.json', {
            method: 'GET'
        });
        const resData = await response.json();
        const loadedUsers = [];

        for(const key in resData){
            loadedUsers.push(
                new User(key, resData[key].email, resData[key].isTeacher, resData[key].firstname, resData[key].lastname, resData[key].phonenumber, resData[key].pushToken)
            );
        }
        dispatch({type: GET_USERS, users: loadedUsers});

    };
};

export const createUsers =(email, firstname, lastname, phonenumber, isTeacher, pushToken)=>{

    return async dispatch =>{
        const response = await fetch('https://clubs-app-test.firebaseio.com/AllUsers.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                firstname: firstname,
                lastname: lastname,
                phonenumber: phonenumber,
                isTeacher: isTeacher,
                pushToken: pushToken
            })
            
        });
        const responseData = await response.json();
        dispatch({
            type: CREATE_USERS,
                userData:{
                    id: responseData.name,
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber,
                    isTeacher: isTeacher,
                    pushToken: pushToken
                }
        });
    };

};


export const signUpUser = (email, password)=> {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuGFqYlYpVnepULIprpSLBu8BhlGsRyvc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            },
        );
        if(!response.ok){
            const errData = await response.json();
            let msg = errData.error.message;
            throw new Error(msg);
        }
        const resData = await response.json();
    };

};

export const loginUser = (email, password)=> {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuGFqYlYpVnepULIprpSLBu8BhlGsRyvc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            },
        );
        if(!response.ok){
            const errData = await response.json();
            let msg = errData.error.message;
            throw new Error(msg);
        }
        const resData = await response.json();
    };

};