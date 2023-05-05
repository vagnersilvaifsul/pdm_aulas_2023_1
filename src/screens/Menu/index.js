import React, {useContext} from 'react';
import {FlatList, Alert} from 'react-native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {CommonActions} from '@react-navigation/native';
import Item from './Item';

const Menu = ({navigation}) => {
  const {signOut} = useContext(AuthUserContext);

  function processar(opcao) {
    switch (opcao) {
      case 'Perfil':
        navigation.navigate('PerfilUsuario');
        break;
      case 'Sair':
        sair();
        break;
    }
  }

  function sair() {
    if (signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Ops!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  return (
    <FlatList
      data={[
        {key: 1, opcao: 'Perfil', iconName: 'person'},
        {key: 2, opcao: 'Sair', iconName: 'log-in-sharp'},
      ]}
      renderItem={({item}) => (
        <Item
          opcao={item.opcao}
          icon={item.iconName}
          onPress={() => processar(item.opcao)}
        />
      )}
      keyExtractor={item => item.key}
    />
  );
};
export default Menu;
