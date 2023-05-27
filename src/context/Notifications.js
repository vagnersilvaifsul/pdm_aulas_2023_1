import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {
  const [notificationContent, setNotificationContent] = useState(null);

  useEffect(() => {
    //quando o app está fechado
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification recebida com o app fechado (objeto destruído): ',
            remoteMessage,
          );
        }
      });

    //quando o app está parado
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('====================================');
      console.log(remoteMessage);
      console.log('====================================');
      if (remoteMessage.notification.title && remoteMessage.notification.body) {
        let content = {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        };
        setNotificationContent(content);
      }
      //navigate(remoteMessage.data.route);
    });

    //quando o app está aberto
    messaging().onMessage(async remoteMessage => {
      console.log(
        'Notification recebida com o app aberto (objeto na RAM, tela pro user): ',
        remoteMessage,
      );
      if (remoteMessage.notification.title && remoteMessage.notification.body) {
        let content = {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
        };
        setNotificationContent(content);
      }
      switch (remoteMessage.data.route) {
        case 'admin':
          Alert.alert(
            'Notificação',
            'Notícia: ' + remoteMessage.notification.body,
            [
              {text: 'ir', onPress: () => {}},
              {text: 'não', onPress: () => {}},
            ],
          );
          break;
        case 'user':
          Alert.alert('user', 'Campanha: ' + remoteMessage.notification.body, [
            {text: 'ir', onPress: () => {}},
            {text: 'não', onPress: () => {}},
          ]);
          break;
      }
    });
  }, []);

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};
