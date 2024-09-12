/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Mensagem recebida no device:");
  console.log(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
