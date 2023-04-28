import React, {useContext} from 'react';
import {CommonActions} from '@react-navigation/native';

import {Container, FlatList} from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import {EmpresaContext} from '../../context/EmpresaProvider';

const Empresas = ({navigation}) => {
  const {companies} = useContext(EmpresaContext);

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
      <FlatList
        data={companies}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={routeAddCompany} />
    </Container>
  );
};
export default Empresas;
