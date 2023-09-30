import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Button, Image} from '@rneui/base';
import {COLORS} from '../../assets/colors';
import Loading from '../../components/Loading';

const Item = ({item, onPress}) => {
  return (
    <Card style={styles.container} containerStyle={styles.container_style}>
      <Card.Title style={styles.curso}>{item.curso}</Card.Title>
      <Card.Divider />
      <View style={styles.estudante}>
        <Image
          style={styles.urlFoto}
          source={{uri: item.urlFoto}}
          PlaceholderContent={<Loading />}
        />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <Button
        title={'Detalhar'}
        type="outline"
        containerStyle={styles.container_button}
        buttonStyle={styles.button}
        titleStyle={{color: COLORS.primaryDark}}
        onPress={onPress}
      />
    </Card>
  );
};
export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  container_style: {
    borderRadius: 10,
    borderColor: COLORS.primaryDark,
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
    marginRight: 20,
    borderRadius: 50 / 2,
  },
  container_button: {
    marginTop: 5,
    width: 100,
    height: 40,
    alignSelf: 'center',
    borderColor: COLORS.primaryDark,
  },
  button: {
    borderColor: COLORS.primaryDark,
    borderRadius: 3,
  },
});
