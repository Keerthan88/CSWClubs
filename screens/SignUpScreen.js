import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'

import * as userActions from '../store/actions/Users';

import { useDispatch } from 'react-redux';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    };
  }
});

const SignUpScreen = props => {

  let isTeacher = props.navigation.getParam('isTeacher');

  const [emailVal, setEmailVal] = useState('');
  const [firstNameVal, setFirstNameVal] = useState('');
  const [lastNameVal, setLastNameVal] = useState('');
  const [phoneNumberVal, setPhoneNumberVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [passCheckVal, setPassCheckVal] = useState('');
  const [pushTokenVal, setPushTokenVal] = useState('');

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status === "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      }).then((statusObj) => {
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted!");

        }
      }).then(() => {
        return Notifications.getExpoPushTokenAsync();
      }).then((response) => {
        console.log('inside push success!');
        console.log(response);
        let tokenVal = response.data;
        tokenVal = tokenVal.substring(18, (tokenVal.length-1));
        setPushTokenVal(tokenVal);
      }).catch((err) => {
        console.log(err);
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundNotificaiton = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Inside background notification listener');
      console.log(response);
    });

    const foregroundNotification = Notifications.addNotificationReceivedListener(response1 => {
      console.log('Inside foreground notification listener');
      console.log(response1);
    });
    return () => {
      backgroundNotificaiton.remove();
      foregroundNotification.remove();
    };
  }, []);




  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const [emailErr, setEmailErr] = useState(true);
  const setEmail = input => {
    setEmailErr(false);
    if (!validateEmail(emailVal)) {
      setEmailErr(true);
    }
    setEmailVal(input);
  };

  const [firstNameErr, setFirstNameErr] = useState(true);
  const setFirstName = input => {
    setFirstNameErr(false);
    if (input.length == 0) {
      setFirstNameErr(true);
    }
    setFirstNameVal(input);
  };

  const [lastNameErr, setLastNameErr] = useState(true);
  const setLastName = input => {
    setLastNameErr(false);
    if (input.length == 0) {
      setLastNameErr(true);
    }
    setLastNameVal(input);
  };

  const [phoneNumberErr, setPhoneNumberErr] = useState(true);
  const [phoneNumberDataVal, setPhoneNumberDataVal] = useState('');
  const setPhoneNumber = input => {
    setPhoneNumberErr(false);
    if (input.length == 0) {
      setPhoneNumberErr(true);
    }

    var cleaned = ('' + input).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

    setPhoneNumberDataVal(cleaned);

    if (match) {
      var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      setPhoneNumberVal(number)
      return;
    }

    setPhoneNumberVal(input);
  };

  const [passwordErr, setPasswordErr] = useState(true);
  const setPassword = input => {
    setPasswordErr(false);
    setPassCheckErr(false);
    if (input.length < 8) {
      setPasswordErr(true);
    }
    if (input != passCheckVal) {
      setPassCheckErr(true);
    }
    setPasswordVal(input);
  };

  const [passCheckErr, setPassCheckErr] = useState(true);
  const setPassCheck = input => {
    setPassCheckErr(false);
    if (input != passwordVal) {
      setPassCheckErr(true);
    }
    setPassCheckVal(input);
  };

  let emailErrMessage;
  let firstNameErrMessage;
  let lastNameErrMessage;
  let phoneNumberErrMessage;
  let passwordErrMessage;
  let passCheckErrMessage;

  const [formSubmmitted, setFormSubmitted] = useState(false);

  if (emailErr && formSubmmitted) {
    emailErrMessage = <Text style={styles.error}> *Invalid Email. </Text>
  }
  if (firstNameErr && formSubmmitted) {
    firstNameErrMessage = <Text style={styles.error}> *Required Field. </Text>
  }
  if (lastNameErr && formSubmmitted) {
    lastNameErrMessage = <Text style={styles.error}> *Required Field. </Text>
  }
  if (phoneNumberErr && formSubmmitted) {
    phoneNumberErrMessage = <Text style={styles.error}> *Required Field. </Text>
  }
  if (passwordErr && formSubmmitted) {
    passwordErrMessage = <Text style={styles.error}> *Must be at least 8 characters </Text>
  }
  if (passCheckErr && formSubmmitted) {
    passCheckErrMessage = <Text style={styles.error}> *Passwords must match. </Text>
  }

  const dispatch = useDispatch();
  let signUpErr = false;
  const signup = async () => {
    setFormSubmitted(true);
    if (!emailErr && !firstNameErr && !lastNameErr && !phoneNumberErr && !passwordErr && !passCheckErr) {
      try {
        signUpErr = false;
        await dispatch(userActions.signUpUser(emailVal, passwordVal));
      } catch (error) {
        signUpErr = true;
        if (error.message === 'EMAIL_EXISTS') {
          Alert.alert('This email has been used to register before!');
        } else {
          Alert.alert('An unknown error occurred... Please try again.');
        }
      }
      if (!signUpErr) {
        await dispatch(userActions.createUsers(emailVal, firstNameVal, lastNameVal, phoneNumberDataVal, isTeacher, pushTokenVal));
        props.navigation.navigate('Login');
      }
    }
  }

  return (
    <ScrollView style={styles.background}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder='Email'
        keyboardType='email-address'
      />
      <View>
        {emailErrMessage}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        placeholder='First Name'
      />
      <View>
        {firstNameErrMessage}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        placeholder='Last Name'
      />
      <View>
        {lastNameErrMessage}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        placeholder='Phone Number'
        value={phoneNumberVal}
        textContentType='telephoneNumber'
        dataDetectorTypes='phoneNumber'
        keyboardType='phone-pad'
      />
      <View>
        {phoneNumberErrMessage}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry={true}
      />
      <View>
        {passwordErrMessage}
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setPassCheck}
        placeholder='Retype Password'
        secureTextEntry={true}
      />
      <View>
        {passCheckErrMessage}
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={signup}
        >
          <Text style={styles.buttontext}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: 'blue',
  },
  error: {
    color: 'white',
    textAlign: 'left',
    marginTop: 10
  },
  input: {
    marginTop: 30,
    height: 40,
    width: 350,
    fontSize: 18,
    textAlign: 'left',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
    elevation: 5,
    borderRadius: 10,
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

export default SignUpScreen;