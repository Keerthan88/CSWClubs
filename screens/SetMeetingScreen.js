import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';

import * as meetingActions from '../store/actions/Meetings';

const SetMeetingScreen = props => {

    let clubID = props.navigation.getParam('clubID');
    let clubName = props.navigation.getParam('clubName');
    let clubOwner = props.navigation.getParam('clubOwner');

    const joinedClubs = useSelector(state => state.clubs.allJoinedClubs);
    const clubMembers = joinedClubs.filter(member => (member.clubid===clubID));

    const allUsers = useSelector(state => state.users.allUsers);
    const owner = allUsers.filter(user => (user.email===clubOwner));
    let ownerToken = owner[0].pushToken;

    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [dateVal, setDateVal] = useState('')
    const [show, setShow] = useState(false);
    const [timeVal, setTimeVal] = useState('');
    const [displayTime, setDisplayTime] = useState('');
    const [displayDate, setDisplayDate] = useState('');
    const [meetingInfoVal, setMeetingInfoVal] = useState('');
    const [meetingInfoErr, setMeetingInfoErr] = useState(true);

    const setMeetingInfo = input => {
        setMeetingInfoErr(false);
        if (input.length == 0) {
            setMeetingInfoErr(true);
        }
        setMeetingInfoVal(input);
    };

    const [formSubmmitted, setFormSubmitted] = useState(false);
    let meetingInfoErrorMessage;
    if ((meetingInfoErr || (dateVal.length === 0) || (timeVal.length === 0)) && formSubmmitted) {
        meetingInfoErrorMessage = <Text style={styles.error}> *Please make sure all fields are filled. </Text>
    }


    const setMeeting = async () => {
        setFormSubmitted(true);
        if (!(meetingInfoErr || (dateVal.length === 0) || (timeVal.length === 0))) {
            try{
                await dispatch(meetingActions.createMeetings(meetingInfoVal, clubID, clubName, clubOwner, dateVal));
                await fetch('https://exp.host/--/api/v2/push/send',{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Accept-Encoding':'gzip, deflate',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: 'ExponentPushToken['+ownerToken+']',
                        title: 'New Meeting: '+clubName,
                        body: displayDate+', '+displayTime
                    })
                });
            }catch(err){
            }
            for (const member in clubMembers){
                try{
                    await dispatch(meetingActions.createMeetings(meetingInfoVal, clubID, clubName, clubMembers[member].user, dateVal));
                    await fetch('https://exp.host/--/api/v2/push/send',{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Accept-Encoding':'gzip, deflate',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: 'ExponentPushToken['+clubMembers[member].pushToken+']',
                        title: 'New Meeting: '+clubName,
                        body: displayDate+', '+displayTime
                    })
                });
                }catch(err){
                }
            }
            props.navigation.navigate('MyClubs');
            Alert.alert('Meeting Set!');
        }
    };


    const onChange = (event, selectedDate) => {

        setShow(false);
        if (selectedDate == undefined) {
            return;
        }

        if (mode === 'time' && selectedDate < new Date()) {
            alert('Please Select A Valid Time');
            setTimeVal('');
            return;
        }



        let formattedDate = (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate() + "-" + selectedDate.getFullYear();
        let formattedTime = selectedDate.toLocaleTimeString();

        var hours = selectedDate.getHours();
        var minutes = selectedDate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        
        setDateVal(selectedDate.toString());
        setDisplayDate(formattedDate.toString());
        setTimeVal(formattedTime.toString());
        setDisplayTime(strTime);
        setDate(selectedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        //console.log('date show')
    };

    const showTimepicker = () => {
        showMode('time');
        //console.log('time show');
    };

    return (

        <ScrollView style={styles.background}>
            <View>
                <Text style={styles.text2}>What is the purpose of this meeting?</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    onChangeText={setMeetingInfo}
                />
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={showDatepicker}
                    >
                        <Text style={styles.buttontext}> Select Meeting Date </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={showTimepicker}
                    >
                        <Text style={styles.buttontext}> Select Meeting Time </Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        style={styles.text}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        minimumDate={new Date()}
                        onChange={onChange}
                    />
                )}
            </View>
            <View>
                <Text style={styles.text}> Date Selected: {displayDate}</Text>
                <Text style={styles.text}> Time Selected: {displayTime}</Text>
            </View>
            <View>
                {meetingInfoErrorMessage}
            </View>
            <View style={styles.button2}>
                <TouchableOpacity
                    onPress={setMeeting}
                >
                    <Text style={styles.buttontext}>Set Meeting</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'blue',
        paddingTop: 20,
        paddingBottom: 50
    },
    text: {
        marginTop: 20,
        height: 40,
        width: 300,
        fontSize: 20,
        textAlignVertical: 'center',
        color: 'white',
        paddingHorizontal: 10
    },
    text2: {
        height: 40,
        width: 400,
        fontSize: 15,
        textAlignVertical: 'center',
        color: 'white',
        paddingHorizontal: 40
    },
    button: {
        elevation: 5,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: '#3498db'
    },
    button2: {
        elevation: 5,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 120,
        marginRight: 120,
        backgroundColor: '#3498db'
    },
    buttontext: {
        height: 40,
        width: 200,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
    },
    input: {
        marginTop: 30,
        height: 120,
        width: 350,
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
        textAlignVertical: 'top',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    text2: {
        marginTop: 40,
        marginLeft: 20,
        color: 'white',
        fontSize: 20
    },
    error: {
        marginTop: 20,
        color: 'red'
    }
});

export default SetMeetingScreen;