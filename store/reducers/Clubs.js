import CLUBS from '../../data/clubs';
import Club from '../../model/Club';
import ClubMember from '../../model/ClubMember';
import { CREATE_CLUBS, GET_CLUBS, GET_MEMBERS, JOIN_CLUB } from '../actions/Clubs';

const initialState = {
    availableClubs: CLUBS,
    allClubs: [],
    joinedClubs: [],
    allJoinedClubs: [],
    ownedClubs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CLUBS:
            const newClub = new Club(action.clubData.id, action.clubData.title, action.clubData.owner, action.clubData.description, action.clubData.moderator, action.clubData.firstname, action.clubData.lastname, action.clubData.phonenumber);
            return {
                ...state,
                ownedClubs: state.ownedClubs.concat(newClub)
            };

        case GET_CLUBS:
            const allExistingClubs = action.clubs;
            const availableClubList = action.clubs.filter(club => (club.owner !== action.owner));
            let alreadyJoinedClub = action.joinedclubs;

            const notJoinedClubList = [];
            //console.log(availableClubList);
            for (const availableClubKey in availableClubList) {
                for (const joinClubKey in alreadyJoinedClub) {
                    if (availableClubList[availableClubKey].id !== alreadyJoinedClub[joinClubKey].clubid) {
                        notJoinedClubList.push(availableClubList[availableClubKey]);
                    }
                }
                console.log(alreadyJoinedClub.length)
                if(alreadyJoinedClub.length ===0){
                    console.log('inside if ');
                    notJoinedClubList.push(availableClubList[availableClubKey]);
                }

            }

            const ownedCLubList = action.clubs.filter(club => (club.owner == action.owner));
            return {
                ...state,
                allClubs: allExistingClubs,
                availableClubs: notJoinedClubList,
                ownedClubs: ownedCLubList
            };

        case JOIN_CLUB:
            const newMember = new ClubMember(action.memberData.id, action.memberData.clubid, action.memberData.clubname, action.memberData.useremail, action.memberData.firstname, action.memberData.lastname, action.memberData.phonenumber);
            return {
                ...state,
                joinedClubs: state.joinedClubs.concat(newMember)
            };

        case GET_MEMBERS:
            const allMemberList = action.members;
            const memberList = action.members.filter(member => (member.user == action.user));
            return {
                ...state,
                joinedClubs: memberList,
                allJoinedClubs: allMemberList
            };
    }

    return state;
}

