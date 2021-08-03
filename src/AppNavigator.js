import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer';

import LoginScreen from '../screens/LoginScreen';
import UserCheck from '../screens/UserCheck'
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MyClubs from '../screens/MyClubs';
import MyMeetings from '../screens/MyMeetings';
import StartClub from '../screens/StartClub';
import JoinClub from '../screens/JoinClub';

import {createAppContainer} from 'react-navigation';

const Drawer = createDrawerNavigator();

function HomeNavigator() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name = "Home" component={HomeScreen} />
        <Drawer.Screen name = "MyClubs" component={MyClubs} />
        <Drawer.Screen name = "MyMeetings" component={MyMeetings} />
        <Drawer.Screen name = "StartClub" component={StartClub} />
        <Drawer.Screen name = "JoinClub" component={JoinClub} />
      </Drawer.Navigator>
    );
}

const Stack = createStackNavigator();

function AppNavigator() {
    return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "UserCheck" component={UserCheck} />
        <Stack.Screen name = "SignUp" component={SignUpScreen} />
        <Stack.Screen name = "Home" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    );
}

//navigationOptions: {header: null},
  
export default createAppContainer(AppNavigator);