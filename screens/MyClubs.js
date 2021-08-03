import React from 'react';
import { View, ScrollView, FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import UserClubListItem from '../components/UserClubListItem';
import JoinedCLubListItem from '../components/JoinedClubListItem';

const MyClubs = props => {

  const ownedClubs = useSelector(state => state.clubs.ownedClubs);
  const joinedClubs = useSelector(state => state.clubs.joinedClubs);
  const clubSelectHandler = (id, name, owner)=>{
    props.navigation.navigate('SetMeeting', {clubID: id, clubName: name, clubOwner: owner});
  }

  let ownedClubDisplay;
  let joinedClubDisplay;

  if(ownedClubs.length===0){
    ownedClubDisplay = <Text style={styles.text2}>You haven't created any clubs yet.</Text>
  }
  else {
    ownedClubDisplay = 
      <FlatList
        data={ownedClubs}
        renderItem={
          itemData =>  <UserClubListItem 
            id = {itemData.item.id}
            title = {itemData.item.title}
            onSelect = {()=>{
              clubSelectHandler(itemData.item.id, itemData.item.title, itemData.item.owner);
            }}
          />      
        }
        keyExtractor={item => item.id}
      />
    }
  
  if(joinedClubs.length===0){
    joinedClubDisplay = <Text style={styles.text2}>You haven't joined any clubs yet.</Text>
  }
  else {
    joinedClubDisplay = 
      <FlatList
        data={joinedClubs}
        renderItem={
          itemData => <JoinedCLubListItem
            clubname = {itemData.item.clubname}
            clubid = {itemData.item.clubid}
          />
        }
        keyExtractor={item => item.id}
      />
  }

  return (
    <View style={styles.background}>

      <Text style={styles.text}>Owned Clubs:</Text>
      <View>
        <SafeAreaView style={styles.lists}>
          {ownedClubDisplay}
        </SafeAreaView>
        <Text></Text>
        <Text style={styles.text}>Joined Clubs:</Text>
        <SafeAreaView style={styles.lists}>
          {joinedClubDisplay}
        </SafeAreaView>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'blue',
    paddingTop: 40
  },
  lists: {
    height: 230,
    backgroundColor: 'blue',
  },
  item: {
    backgroundColor: '#3498db',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  exit: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    alignSelf: 'center'
  },
  text: {
    marginBottom: 10,
    height: 40,
    width: 300,
    fontSize: 25,
    textAlignVertical: 'center',
    color: 'white',
    paddingHorizontal: 10,
  },
  text2: {
    marginBottom: 10,
    height: 80,
    width: 350,
    fontSize: 20,
    textAlignVertical: 'center',
    color: 'white',
    paddingHorizontal: 10,
  }
});

export default MyClubs;