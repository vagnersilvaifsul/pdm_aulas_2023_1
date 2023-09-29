import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
              urlFoto: doc.data().urlFoto,
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
          urlFoto: estudante.urlFoto,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('EstudanteProvider, salvar: ' + e);
      return false;
    }
  };

  const del = async (uid, path) => {
    try {
      await firestore().collection('estudantes').doc(uid).delete();
      await storage().ref(path).delete();
      return true;
    } catch (e) {
      console.error('EstudanteProvider, del: ', e);
      return false;
    }
  };

  //path: o caminho onde deve ser salva a imagem no Storage
  //image: qual imagem deve ser salva nesse path (qual imagem faz o upload)
  async function sendImageToStorage(path, imagem) {
    let url = ''; //local onde a imagem será salva no Storage
    const task = storage().ref(path).putFile(imagem?.uri);
    task.on('state_changed', taskSnapshot => {
      //Para acompanhar o upload
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });
    await task.then(async () => {
      //se a task finalizar com sucesso, busca
      url = await storage().ref(path).getDownloadURL();
    });
    task.catch(e => {
      console.error('EstudanteProvider, sendImageToStorage: ' + e);
    });
    return url;
  }

  return (
    <EstudanteContext.Provider
      value={{estudantes, save, del, sendImageToStorage}}>
      {children}
    </EstudanteContext.Provider>
  );
};
