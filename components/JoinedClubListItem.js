import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, FlatList, SafeAreaView} from 'react-native';
import { useSelector } from 'react-redux';
import MemberItem from './MemberItem';

const JoinedClubListItem = props =>{

    const [modalVisible, setModalVisible] = useState(false);
    const joinedClubs = useSelector(state => state.clubs.allJoinedClubs);
    const clubMembers = joinedClubs.filter(member => (member.clubid===props.clubid));
    const allClubs = useSelector(state => state.clubs.allClubs);
    const currentClub = allClubs.filter(club => (club.id===props.clubid));

    return(
        <View style = {styles.display}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
            <View style={styles.background}>
                <SafeAreaView style={styles.item}>
                    <Text style={styles.listtext}>Owner: {currentClub[0].firstname}</Text>
                    <Text style={styles.listtext}>List of Members:</Text>
                    <FlatList
                        data={clubMembers}
                        renderItem={
                            itemData =>  <MemberItem
                            firstname = {itemData.item.firstname}
                        />      
                        }
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.exittext}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>

            <TouchableOpacity
                onPress={()=> {
                    setModalVisible(true);
                }}
            >
                <Text style = {styles.titletext}> {props.clubname} </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'blue',
        paddingTop: 40,
        paddingBottom: 50
    },
    item:{
        backgroundColor: '#3498db',
        elevation: 5,
        borderRadius: 15,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    display:{
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
        borderRadius:15,
        height: 50,
    },
    titletext:{
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
    },
    exittext:{
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    listtext:{
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        color: 'white'
    }
});

export default JoinedClubListItem;