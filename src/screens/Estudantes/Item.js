import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image} from '@rneui/themed';
import {COLORS} from '../../assets/colors';
import OutlineButton from '../../components/OutlineButton';

const Item = ({item, onPress}) => {
  return (
    <Card style={styles.container} containerStyle={styles.container_style}>
      <Card.Title style={styles.curso}>{item.curso}</Card.Title>
      <Card.Divider />
      <View style={styles.estudante}>
        <Image style={styles.urlFoto} source={{uri: item.urlFoto}} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <OutlineButton
        texto={'Detalhar'}
        onClick={onPress}
        containerStyle={styles.container_button}
        buttonStyle={styles.button}
      />
    </Card>
  );
};
export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  container_style: {
    borderRadius: 10,
    borderColor: COLORS.primaryDark,
    backgroundColor: COLORS.white,
  },
  curso: {
    color: COLORS.primaryDark,
  },
  nome: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: 'bold',
  },
  estudante: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlFoto: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    marginRight: 20,
    borderRadius: 50 / 2,
  },
  container_button: {
    width: 50,
    alignSelf: 'center',
    backgroundColor: COLORS.transparent,
  },
  button: {
    height: 24,
    alignSelf: 'center',
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
