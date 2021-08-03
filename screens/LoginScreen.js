import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Image, Alert} from 'react-native';

import * as userActions from '../store/actions/Users';
import * as clubActions from '../store/actions/Clubs';
import {useDispatch} from 'react-redux';

//import CSWLogo from '../src/Images/CSWLogo2.png';
import CSWLogo from '../src/Images/CSWLogo2_old.jpg';

const LoginScreen = props => {

  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');

  const setEmail = input =>{
    setEmailVal(input);
  };
  const setPassword = input =>{
    setPasswordVal(input);
  };
  
  const dispatch = useDispatch();
  let loginErr = false;
  const login = async () =>{
      try{
        await dispatch(userActions.loginUser(emailVal, passwordVal));
      }catch(error){
        loginErr = true;
        if(error.message === 'INVALID_EMAIL'){
          Alert.alert("This email doesn't have an account associated with it!");
        }else if (error.message === 'INVALID_PASSWORD'){
          Alert.alert("This password doesn't match the email!");
        }else{
          Alert.alert('An unknown error occurred... Please try again.');
        }
      }
      if(!loginErr){
        await dispatch(clubActions.getMembers(emailVal));
        await dispatch(userActions.getUsers());
        props.navigation.navigate('Home', {email: emailVal});
      }

  }

    return(
      <View style={styles.background}>
        <Image
          source = {CSWLogo}
          style = {styles.logo}
        />
        
        <TextInput
          style = {styles.input}
          onChangeText = {setEmail}
          placeholder ='Email'
        />
        <TextInput
          secureTextEntry = {true}
          style = {styles.input}
          onChangeText = {setPassword}
          placeholder ='Password'
        />

        <Text></Text>

        <View style={styles.button}>
          <TouchableWithoutFeedback
            onPress={login}
          >
            <Text style = {styles.buttontext}>Login</Text>
          </TouchableWithoutFeedback>
        </View>      
        
        <View style={styles.button}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('UserCheck')}
          >
            <Text style = {styles.buttontext}>Sign Up</Text>
          </TouchableWithoutFeedback>
        </View>      

      </View>      
    )
  }

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: 'blue',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius:90,
    alignSelf: 'center',
    marginBottom: 20
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
  button: {
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 5,
    borderRadius:10,
    backgroundColor: '#3498db'
  },
  buttontext: {
    height: 40,
    width: 100,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  }
});

export default LoginScreen;