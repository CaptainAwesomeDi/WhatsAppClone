import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  NavigationActions,
  createStackNavigator,
  TabNavigator
} from 'react-navigation';
import addNavigationHelpers from '../node_modules/react-navigation/src/addNavigationHelpers'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import {Text, View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Groups from './screens/group.screen';
import Messages from './screens/messages.screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabText: {
    color: '#777',
    fontSize: 10,
    justifyContent: 'center',
  },
  selected: {
    color: 'blue',
  },
});

const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>
      {title}
    </Text>
  </View>
);

// tabs in main screen
const MainScreenNavigator = TabNavigator({
  Chats: {screen: Groups },
  Settings: {screen: TestScreen('Settings')}
},{
  initialRouteName: 'Chats',
});

const AppNavigator = createStackNavigator({
  Main: {screen: MainScreenNavigator},
  Messages: {screen: Messages},
},{
    mode: 'modal',
});

//reducer inititalization code
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Main'));
export const navigationReducer = createNavigationReducer(AppNavigator)

// export const navigationReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAciton(action, state);

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener('root');

class AppWithNavigationState extends Component {
  render() {
    const {dispatch, nav} = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });
    return (
      <AppNavigator navigation={navigation} />
      );
    }
  }

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);