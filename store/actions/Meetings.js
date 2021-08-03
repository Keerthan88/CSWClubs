import Meeting from "../../model/Meeting";

export const CREATE_MEETINGS = 'CREATE_MEETINGS';
export const GET_MEETINGS = 'GET_MEETINGS';

export const createMeetings = (description, clubid, clubname, memberemail, dateandtime)=>{

    return async dispatch =>{
        const response = await fetch('https://clubs-app-test.firebaseio.com/AllMeetings.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: description,
                clubid: clubid,
                clubname: clubname,
                memberemail: memberemail,
                dateandtime: dateandtime
            })
            
        });
        const responseData = await response.json();
        dispatch({
            type: CREATE_MEETINGS,
                meetingData:{
                    id: responseData.name,
                    description: description,
                    clubid: clubid,
                    clubname: clubname,
                    memberemail: memberemail,
                    dateandtime: dateandtime
                }
        });
    };
};

export const getMeetings = (email) =>{
    return async dispatch => {
        const response = await fetch('https://clubs-app-test.firebaseio.com/AllMeetings.json', {
            method: 'GET'
        });
        const resData = await response.json();
        const loadedMeetings = [];

        for(const key in resData){
            loadedMeetings.push(
                new Meeting(key, resData[key].description, resData[key].clubid, resData[key].clubname, resData[key].memberemail, resData[key].dateandtime)
            );
        }
        dispatch({type: GET_MEETINGS, meetings: loadedMeetings, user: email});

    };
};