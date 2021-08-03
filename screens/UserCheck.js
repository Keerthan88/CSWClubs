import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

import TeacherIcon from '../src/Images/Teacher.png';
import StudentIcon from '../src/Images/Student.png';


const UserCheck = props => {

  return (
    <View style={styles.background}>

      <View style={styles.button}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('SignUp', {isTeacher: false})}
        >
          <View>
            <Text style={styles.buttontext}>I'm A Student</Text>
            <Image
              source = {StudentIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
        
      </View>

      <View style={styles.button}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('SignUp',{isTeacher: true})}
        >
          <View>
            <Text style={styles.buttontext}>I'm A Teacher</Text>
            <Image
              source = {TeacherIcon}
              style = {styles.logo}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'blue',
  },
  button: {
    flex: .5,
    elevation: 5,
    borderRadius:15,
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    backgroundColor: '#3498db'
  },
  buttontext: {
    height: 80,
    width: 250,
    fontSize: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20
  }
});

export default UserCheck;