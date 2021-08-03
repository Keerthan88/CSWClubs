import React, { useState } from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MeetingItem = props =>{

    let date = new Date(props.dateandtime);

    let strDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.display}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
            <View style={styles.background}>
            <View style={styles.item}>

                <Text style={styles.titletext}>Description:</Text>
                <Text style={styles.titletext}>{props.description}</Text>
                
                <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.exit}>Close</Text>
                </TouchableOpacity>
                </View>

            </View>
            </View>
            </Modal>
            <TouchableOpacity
                onPress={()=> {
                    setModalVisible(true);
                }}
            >
                <Text style = {styles.titletext}> {props.clubname}:</Text>
                <Text style = {styles.titletext}> {strDate}, {strTime} </Text>
            </TouchableOpacity>       
        </View>
    );
};

const styles = StyleSheet.create({
    display:{
        backgroundColor: 'white',
        marginTop: 20,
        elevation: 5,
        borderRadius:15,
        height: 90,
    },
    titletext: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        color: 'black'
    },
    background: {
        flex: 1,
        backgroundColor: 'blue',
        paddingTop: 40,
        paddingBottom: 50
    },
    description: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 5
    },
    exit: {
        fontSize: 25,
        paddingTop: 40,
        color: 'white',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#3498db',
        elevation: 5,
        borderRadius: 15,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

export default MeetingItem;