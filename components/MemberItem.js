import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MemberItem = props =>{
    return(
        <View>
            <Text style = {styles.titletext}> {props.firstname} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default MemberItem;