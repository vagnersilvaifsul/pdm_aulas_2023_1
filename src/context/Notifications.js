import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    /*
      Inscreve os listeners para os 3 tipos de processamento de notifications.
      Obs.: Para que estes listeners funcionem, no arquivo index.js (na raiz do app) você
      deve registrar o messaging().setBackgroundMessageHandler(async remoteMessage => {}).
    */

    //quando o app está fechado (testado, ok)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification recebida com o app fechado (activity onDestroy): ',
          remoteMessage,
        );
        if (remoteMessage) {
          setNotification(remoteMessage);
          //TODO: abrir a notification na página correta
        }
      });

    //quando o app está parado (testado, ok)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification recebida com o app parado (activity onStop): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
        //TODO: abrir a notification na página correta
      }
    });

    //quando o app está aberto (testado, ok)
    messaging().onMessage(async remoteMessage => {
      console.log(
        'Notification recebida com o app aberto (activity na tela): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
        switch (remoteMessage.data.route) {
          case 'admin':
            Alert.alert('admin', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}}, //TODO: abrir a notification na página correta
              {text: 'não', onPress: () => {}},
            ]);
            break;
          case 'user':
            Alert.alert('user', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}}, //TODO: abrir a notification na página correta
              {text: 'não', onPress: () => {}},
            ]);
            break;
        }
      }
    });
  }, []);

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};
