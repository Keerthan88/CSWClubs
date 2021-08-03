import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import MeetingItem from '../components/MeetingItem';


const MyMeetings = props => {

  const myMeetings = useSelector(state => state.meetings.myMeetings);
  let sortedMeetings = myMeetings.sort((a, b) => a.dateandtime - b.dateandtime);

  let myMeetingsDisplay;

  if(myMeetings.length===0){
    myMeetingsDisplay = <Text style={styles.text}>No Upcoming Meetings!</Text>
  }
  else {
    myMeetingsDisplay = 
      <FlatList
        data={myMeetings}
        renderItem={
          itemData =>  <MeetingItem 
            clubname = {itemData.item.clubname}
            dateandtime = {itemData.item.dateandtime}
            description = {itemData.item.description}
          />      
        }
        keyExtractor={item => item.id}
      />
    }

  return (
    <View style={styles.background}>
      <SafeAreaView>
        {myMeetingsDisplay}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: 'blue',
  },
  text: {
    height: 100,
    width: 300,
    fontSize: 25,
    textAlignVertical: 'center',
    color: 'white',
    paddingHorizontal: 10,
  }
});

export default MyMeetings;