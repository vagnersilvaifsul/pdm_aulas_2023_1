import React, {useContext} from 'react';
import {
  FlatList,
  Text,
  Alert,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/colors';

const Menu = ({navigation}) => {
  const {sigOut} = useContext(AuthUserContext);

  function sair() {
    if (sigOut()) {
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
      data={[{key: 1, opcao: 'Sair'}]}
      renderItem={({item}) => (
        <TouchableHighlight style={styles.buttom} onPress={() => sair()}>
          <>
            <Icon name="log-in-sharp" color={COLORS.primary} size={30} />
            <Text style={styles.text}>{item.opcao}</Text>
          </>
        </TouchableHighlight>
      )}
      keyExtractor={item => item.key}
    />
  );
};
export default Menu;

const styles = StyleSheet.create({
  buttom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    padding: 10,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 28,
    paddingLeft: 10,
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});
