import React, {createContext, useEffect, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = () => {
    const localhost =
      'http://192.168.68.107:8080/v1/projects/pdm-aulas-797c8/databases/(default)/documents/';
    const remotehost =
      'https://firestore.googleapis.com/v1/projects/pdm-aulas-797c8/databases/(default)/documents/';
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL: localhost,
              headers: {Authorization: 'Bearer ' + idToken},
            });

            //console.log(apiLocal);
            //utiliza o middleware para lançar um exceção (usa try-catch no consumidor)
            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            //coloca no state
            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi: ' + e);
        });
    }
  };

  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      }
    });
    return unsubscriber; //unsubscribe o listener ao desmontar
  }, []);

  return (
    <ApiContext.Provider
      value={{
        api,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
