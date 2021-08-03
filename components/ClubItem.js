import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import * as clubActions from '../store/actions/Clubs';

import {useDispatch, useSelector} from 'react-redux';

const ClubItem = props => {

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const joinedclubs = useSelector(state => state.clubs.joinedClubs);
    // console.log(joinedclubs);
    // await dispatch(clubActions.getClubs(props.user, joinedclubs));

    const joinClub = async () =>{
        await dispatch(clubActions.joinClub(props.id, props.title, props.user, props.userfirstname, props.userlastname, props.userphonenumber, props.userPushToken));
        setModalVisible(!modalVisible);
    };

    return ( 
        <View style={styles.display}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
            <View style={styles.background}>
            <View style={styles.item}>

                <Text style={styles.titletext}>Description:</Text>
                <Text style={styles.description}>{props.description}</Text>
                
                <View style={styles.rowview}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={joinClub}
                >
                    <Text style={styles.exit}>Join Club</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.exit}>Cancel</Text>
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
                <Text style={styles.titletext}> {props.title} </Text>
                <Text style={styles.regulartext}> Owner: {props.firstname} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'blue',
        paddingTop: 40,
        paddingBottom: 50
    },
    rowview: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        textAlignVertical: 'bottom'
    },
    display: {
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
        borderRadius: 15,
        height: 75,
    },
    titletext: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
    },
    regulartext: {
        marginLeft: 10,
        fontSize: 15,
    },
    item: {
        backgroundColor: '#3498db',
        elevation: 5,
        borderRadius: 15,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    button: {
        width:175,
        height: 100,
        alignSelf: 'center',
        marginTop: 20
    },
    description: {
       fontSize: 20,
       marginLeft: 10,
       marginTop: 5
    },
    exit: {
       fontSize: 30,
       paddingTop: 40,
       color: 'white',
       alignSelf: 'stretch',
       textAlign: 'center',
    }
});

export default ClubItem;
