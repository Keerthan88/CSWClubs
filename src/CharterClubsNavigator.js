import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import UserCheck from '../screens/UserCheck'
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MyClubs from '../screens/MyClubs';
import MyMeetings from '../screens/MyMeetings';
import StartClub from '../screens/StartClub';
import JoinClub from '../screens/JoinClub';
import SetMeetingScreen from '../screens/SetMeetingScreen';

const CharterClubsNavigator = createStackNavigator({
    Login:{
      screen: LoginScreen,
      navigationOptions:{
        title: 'Login',
        headerTitleAlign: 'left'
      }
    },
    UserCheck:{
      screen: UserCheck,
      navigationOptions:{
        title: ''
      }
    },
    SignUp:{
      screen: SignUpScreen,
      navigationOptions:{
        title: 'Sign Up',
        headerTitleAlign: 'left'
      }
    },
    Home:{
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    MyClubs:{
      screen: MyClubs,
      navigationOptions:{
        title: 'My Clubs',
        headerTitleAlign: 'left'
      }
    },
    MyMeetings:{
      screen: MyMeetings,
      navigationOptions:{
        title: 'My Meetings',
        headerTitleAlign: 'left'
      }
    },
    StartClub:{
      screen: StartClub,
      navigationOptions:{
        title: 'Start A Club',
        headerTitleAlign: 'left'
      }
    },
    JoinClub:{
      screen: JoinClub,
      navigationOptions:{
        title: 'Join A Club',
        headerTitleAlign: 'left'
      }
    },
    SetMeeting:{
      screen: SetMeetingScreen,
      navigationOptions:{
        title: 'Set A Meeting',
        headerTitleAlign: 'left'
      }
    }
  },{
    initialRouteName: 'Login'
  })
  
  export default createAppContainer(CharterClubsNavigator);