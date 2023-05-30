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
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              uid: doc.id,
              nome: doc.data().nome,
              curso: doc.data().curso,
            });
          });
          setEstudantes(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async estudante => {
    try {
      await firestore().collection('estudantes').doc(estudante.uid).set(
        {
          nome: estudante.nome,
          curso: estudante.curso,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('EstudanteProvider, salvar: ' + e);
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('estudantes').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('EstudanteProvider, del: ', e);
      return false;
    }
  };

  return (
    <EstudanteContext.Provider value={{estudantes, save, del}}>
      {children}
    </EstudanteContext.Provider>
  );
};
