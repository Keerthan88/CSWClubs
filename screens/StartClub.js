import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import * as clubActions from '../store/actions/Clubs';

import {useDispatch} from 'react-redux';

const StartClub = props => {

  let activeEmail = props.navigation.getParam('email');
  const allUsers = useSelector(state => state.users.allUsers);
  const currentUser = allUsers.filter(user => (user.email==activeEmail));
  let userJsonVal;
  if(currentUser.length>0){
    userJsonVal = currentUser[0];
  }

  const [clubNameVal, setClubNameVal] = useState('');
  const [clubInfoVal, setClubInfoVal] = useState('');
  const [modNameVal, setModNameVal] = useState('');

  const [clubNameErr, setClubNameErr] = useState(true);
  const [clubInfoErr, setClubInfoErr] = useState(true);
  const [modNameErr, setModNameErr] = useState(true);

  const dispatch = useDispatch();

  const setClubName = input =>{
    setClubNameErr(false);
    if(input.length == 0){
      setClubNameErr(true);
    }
    setClubNameVal(input);
  };
  const setClubInfo = input =>{
    setClubInfoErr(false);
    if(input.length == 0){
      setClubInfoErr(true);
    }
    setClubInfoVal(input);
  };
  const setModerator = input =>{
    setModNameErr(false);
    if(input.length == 0){
      setModNameErr(true);
    }
    setModNameVal(input);
  };

  const [formSubmmitted, setFormSubmitted] = useState(false);
  
  let errorMessage;

  if((clubNameErr || clubInfoErr || modNameErr) && formSubmmitted){
    errorMessage = <Text style = {styles.error}> *Please make sure all fields are filled. </Text>
  }

  const startClub = async () =>{
    setFormSubmitted(true);
    if(!clubNameErr && !clubInfoErr && !modNameErr){
      await dispatch(clubActions.createClubs(clubNameVal, userJsonVal.email, clubInfoVal, modNameVal, userJsonVal.firstname, userJsonVal.lastname, userJsonVal.phonenumber));
      props.navigation.navigate('Home');
    }
  };

    return(
      <ScrollView style={styles.background}>
        
        <Text style = {styles.text}>What is the name of your club?</Text>
        <TextInput
          style = {styles.input}
          onChangeText = {setClubName}
        />

        <Text style = {styles.text}>Briefly describe your club:</Text>
        <TextInput
          style = {styles.input2}
          onChangeText = {setClubInfo}
          multiline = {true}
        />

        <Text style = {styles.text}>Which teacher will moderate the club?</Text>
        <TextInput
          style = {styles.input}
          onChangeText = {setModerator}
        />    
        
        <View>
          {errorMessage}
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress = {startClub}
          >
            <Text style = {styles.buttontext}>Create Club</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>      
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
    marginTop: 40,
    color: 'white',
    fontSize: 20
  },
  input: {
    marginTop: 30,
    height: 40,
    width: 350,
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: 'white',
    color: 'black',
    borderRadius:5,
    paddingHorizontal: 10
  },
  input2: {
    marginTop: 30,
    height: 300,
    width: 350,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    color: 'black',
    borderRadius:5,
    paddingHorizontal: 10
  },
  error: {
    color: 'red',
    textAlign: 'left',
    marginTop: 20
  },
  button: {
    width:200,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 50,
    elevation: 5,
    borderRadius:10,
    backgroundColor: '#3498db'
  },
  buttontext: {
    height: 40,
    width: 150,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  }
});

export default StartClub;