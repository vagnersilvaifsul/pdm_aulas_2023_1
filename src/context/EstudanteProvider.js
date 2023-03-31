import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('estudantes')
      .orderBy('nome')
      .onSnapshot(snapShot => {
        //console.log(snapShot);
        //console.log(snapShot._docs);
        let data = [];
        snapShot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            curso: doc.data().curso,
          });
        });
        setEstudantes(data);
      });

    return () => {
      listener();
    };
  }, []);

  return (
    <EstudanteContext.Provider value={{estudantes}}>
      {children}
    </EstudanteContext.Provider>
  );
};
