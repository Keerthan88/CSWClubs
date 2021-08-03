import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

import * as clubActions from '../store/actions/Clubs';
import * as meetingActions from '../store/actions/Meetings';
import {useDispatch, useSelector} from 'react-redux';

import HomeIcon from '../src/Images/Home.png';
import CalendarIcon from '../src/Images/Calendar.png';
import GroupIcon from '../src/Images/Group.png';
import JoinIcon from '../src/Images/Join.png';
import AddIcon from '../src/Images/Add.png';


const HomeScreen = props => {

  let activeEmail = props.navigation.getParam('email');
  const joinedclubs = useSelector(state => state.clubs.joinedClubs);
  
  const allUsers = useSelector(state => state.users.allUsers);
  const currentUser = allUsers.filter(user => (user.email==activeEmail));
  let userJsonVal;
  if(currentUser.length>0){
    userJsonVal = currentUser[0];
  }
  
  const dispatch = useDispatch();
  const openClubList = async () => {
    await dispatch(clubActions.getClubs(activeEmail, joinedclubs));
    props.navigation.navigate('JoinClub', {email: activeEmail});
  }
  const openMyClubs = async () => {
    await dispatch(clubActions.getClubs(activeEmail, joinedclubs));
    await dispatch(clubActions.getMembers(activeEmail));
    props.navigation.navigate('MyClubs');
  }
  const openMyMeetings = async () => {
    await dispatch(meetingActions.getMeetings(activeEmail));
    props.navigation.navigate('MyMeetings');
  }

  return (
    <View style={styles.background}>
      
      <Image
          source = {HomeIcon}
          style = {styles.logo2}
        />
      <Text style = {styles.text}> Welcome, {userJsonVal.firstname}!</Text>

      <View style={styles.rowview}>
      <View style={styles.buttonA}>
        <TouchableWithoutFeedback
          onPress={openMyClubs}
        >
          <View>
            <Text style={styles.buttontext}>My Clubs</Text>
            <Image
              source = {GroupIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonB}>
        <TouchableWithoutFeedback
          onPress={openMyMeetings}
        >
          <View>
            <Text style={styles.buttontext}>My Meetings</Text>
            <Image
              source = {CalendarIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      </View>

      <View style={styles.rowview}>
      <View style={styles.buttonC}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('StartClub', {email: activeEmail})}
        >
          <View>
            <Text style={styles.buttontext}>Start A Club</Text>
            <Image
              source = {AddIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
     
      <View style={styles.buttonD}>
        <TouchableWithoutFeedback
          onPress={openClubList}
        >
          <View>
            <Text style={styles.buttontext}>Join A Club</Text>
            <Image
              source = {JoinIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      </View>

      <View style={styles.button2}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('Login')}
        >
          <Text style={styles.buttontext2}>Logout</Text>
        </TouchableWithoutFeedback>
      </View>

    </View>
  )
};
HomeScreen.navigationOptions = (navigationData) =>{
  return{
    headerTitle: 'Home'
  }
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingRight: 15,
    backgroundColor: 'blue',
    paddingTop: 60,
    alignItems: 'center'
  },
  rowview: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  buttonA: {
    elevation: 5,
    borderRadius:15,
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'orange'
  },
  buttonB: {
    elevation: 5,
    borderRadius:15,
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'green'
  },
  buttonC: {
    elevation: 5,
    borderRadius:15,
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'purple'
  },
  buttonD: {
    elevation: 5,
    borderRadius:15,
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'red'
  },
  buttontext: {
    marginTop: 5,
    height: 50,
    width: 150,
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: 'white'
  },
  button2: {
    marginTop: 50,
    alignItems: 'center',
    marginLeft: 15,
    elevation: 5,
    borderRadius:10,
    backgroundColor: '#3498db'
  },
  buttontext2: {
    height: 40,
    width: 100,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10
  },
  logo2: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30
  }
});

export default HomeScreen;