import Meeting from '../../model/Meeting';
import { CREATE_MEETINGS, GET_MEETINGS } from '../actions/Meetings';

const initialState = {
    allMeetings: [],
    myMeetings: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MEETINGS:
            const newMeeting = new Meeting(action.meetingData.id, action.meetingData.description, action.meetingData.clubid, action.meetingData.clubname, action.meetingData.memberemail, action.meetingData.dateandtime);
            return {
                ...state,
                allMeetings: state.allMeetings.concat(newMeeting)
            };

        case GET_MEETINGS:
           
            const allMeetingList = action.meetings;
            const myMeetingList = action.meetings.filter(meeting => (meeting.memberemail == action.user));
            
            return {
                ...state,
                allMeetings: allMeetingList,
                myMeetings: myMeetingList
            };
    }

    return state;
}

