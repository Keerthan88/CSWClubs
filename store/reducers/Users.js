import USERS from '../../data/users';
import User from '../../model/User';
import { CREATE_USERS } from '../actions/Users';
import { GET_USERS } from '../actions/Users';

const initialState = {
    allUsers: USERS
};

export default (state = initialState, action) => {
    
    switch(action.type){
        case CREATE_USERS:
           const newUser = new User(action.userData.id, action.userData.email, action.userData.isTeacher, action.userData.firstname, action.userData.lastname, action.userData.phonenumber, action.userData.pushToken);
            return {
                ...state,
                allUsers: state.allUsers.concat(newUser),
            };
        case GET_USERS:
            const tempUserList = action.users;
            return {
                ...state,
                allUsers: tempUserList
            };
    }

    return state;
}
