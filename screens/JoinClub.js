import React from 'react';
import { View, FlatList, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';

import ClubItem from '../components/ClubItem';

const JoinClub = props => {

  let activeEmail = props.navigation.getParam('email');
  const allUsers = useSelector(state => state.users.allUsers);
  const currentUser = allUsers.filter(user => (user.email==activeEmail));
  let userJsonVal;
  if(currentUser.length>0){
    userJsonVal = currentUser[0];
  }
  
  const listOfAvailableClubs = useSelector(state => state.clubs.availableClubs);

  return (
    <View style={styles.background}>

      <Text style={styles.text}>List of active clubs:</Text>
      <View>
          <FlatList
            data={listOfAvailableClubs}
            renderItem = {
              itemData =>  <ClubItem 
                id = {itemData.item.id}
                title = {itemData.item.title}
                owner = {itemData.item.owner}
                firstname = {itemData.item.firstname}
                description = {itemData.item.description}
                user = {userJsonVal.email}
                userfirstname = {userJsonVal.firstname}
                userlastname = {userJsonVal.lastname}
                userphonenumber = {userJsonVal.phonenumber}
                userPushToken = {userJsonVal.pushToken}
              />
            }
            keyExtractor={item => item.id}
          />
      </View>
      
    </View>


  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'blue',
    paddingTop: 40,
    paddingBottom: 50
  },
  text: {
    height: 40,
    width: 300,
    fontSize: 25,
    textAlignVertical: 'center',
    color: 'white',
    paddingHorizontal: 10,
  }
});

export default JoinClub;