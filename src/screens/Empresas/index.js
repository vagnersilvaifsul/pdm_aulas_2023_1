import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import {EmpresaContext} from '../../context/EmpresaProvider';
import SearchBar from '../../components/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {empresas} = useContext(EmpresaContext);
  const [empresasTemp, setEmpresasTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...empresas.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setEmpresasTemp(a);
      }
    } else {
      setEmpresasTemp([]);
    }
  };

  const routeCompany = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Empresa',
        params: item,
      }),
    );
  };

  const routeAddCompany = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Empresa',
        params: {
          nome: '',
          tecnologias: '',
          latitude: '',
          longitude: '',
        },
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Quem você procura?" setSearch={filterByName} />
      <FlatList
        data={empresasTemp.length > 0 ? empresasTemp : empresas}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeCompany(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={routeAddCompany} />
    </Container>
  );
};
