import React, {useContext, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import {EmpresaContext} from '../../context/EmpresaProvider';
import SearchBar from '../../components/SearchBar';

const Empresas = ({navigation}) => {
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
        params: {company: item},
      }),
    );
  };

  const routeAddCompany = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Empresa',
        params: {company: null},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeCompany(item)} />
  );

  return (
    <Container>
      <SearchBar setSearch={filterByName} />
      <FlatList
        data={empresasTemp.length > 0 ? empresasTemp : empresas}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddCompany} />
    </Container>
  );
};
export default Empresas;
