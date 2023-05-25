/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from '../context/ApiProvider';

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({children}) => {
  const [empresas, setEmpresas] = useState([]);
  const {api} = useContext(ApiContext);

  //console.log(api);

  useEffect(() => {
    if (api) {
      getCompanies();
    }
  }, [api]);

  const getCompanies = async () => {
    try {
      const response = await api.get('/empresas');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas-797c8/databases/(default)/documents/empresas/',
        );
        //console.log(k[1]);
        // console.log(d.fields.latitude.stringValue);
        // console.log(d.fields.longitude.stringValue);
        data.push({
          nome: d.fields.nome.stringValue,
          tecnologias: d.fields.tecnologias.stringValue,
          latitude: d.fields.latitude.stringValue,
          longitude: d.fields.longitude.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });
      setEmpresas(data);
    } catch (response) {
      console.error('Erro em getCompanies via API:');
      console.error(response);
    }
  };

  // const getCompanies = async () => {
  //   const unsubscribe = firestore()
  //     .collection('companies')
  //     .orderBy('nome')
  //     .onSnapshot(
  //       //inscrevendo um listener
  //       (querySnapshot) => {
  //         let d = [];
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           //console.log(doc.id, ' => ', doc.data());
  //           const val = {
  //             uid: doc.id,
  //             nome: doc.data().nome,
  //             tecnologias: doc.data().tecnologias,
  //           };
  //           d.push(val);
  //         });
  //         //console.log(d);
  //         setCompanies(d);
  //       },
  //       (e) => {
  //         console.error('CompanyProvider, getCompanies: ' + e);
  //       },
  //     );
  //   return unsubscribe;
  // };

  const saveCompany = async val => {
    try {
      await api.post('/empresas/', {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude},
        },
      });
      getCompanies();
      return true;
    } catch (response) {
      console.error('Erro em saveCompany via API: ' + response);
      return false;
    }
  };

  // const saveCompany = async (val) => {
  //   await firestore()
  //     .collection('companies')
  //     .doc(val.uid)
  //     .set(
  //       {
  //         nome: val.nome,
  //         tecnologias: val.tecnologias,
  //       },
  //       {merge: true},
  //     )
  //     .then(() => {
  //       showToast('Dados salvos.');
  //     })
  //     .catch((e) => {
  //       console.error('CompanyProvider, saveCourse: ' + e);
  //     });
  // };

  const updateCompany = async val => {
    try {
      await api.patch('/empresas/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude},
        },
      });
      getCompanies();
      return true;
    } catch (response) {
      // console.error('Erro em updateCompany via API: ' + response);
      return false;
    }
  };

  const deleteCompany = async val => {
    try {
      await api.delete('/empresas/' + val);
      getCompanies();
      return true;
    } catch (response) {
      console.error('Erro em deleteCompany via API: ' + response);
      return false;
    }
  };

  // const deleteCompany = async (val) => {
  //   firestore()
  //     .collection('companies')
  //     .doc(val)
  //     .delete()
  //     .then(() => {
  //       showToast('Empresa excluída.');
  //     })
  //     .catch((e) => {
  //       console.error('CompanyProvider, deleteCompany: ', e);
  //     });
  // };

  return (
    <EmpresaContext.Provider
      value={{
        empresas,
        saveCompany,
        updateCompany,
        deleteCompany,
      }}>
      {children}
    </EmpresaContext.Provider>
  );
};
