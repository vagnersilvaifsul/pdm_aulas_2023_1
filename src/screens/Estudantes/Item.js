import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
    },
    curso: {
      color: theme.colors.primaryDark,
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
      backgroundColor: theme.colors.transparent,
      marginRight: 20,
      borderRadius: 50 / 2,
    },
    nome: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.curso}>{item.curso}</Card.Title>
      <Card.Divider />
      <View style={styles.estudante}>
        <Image style={styles.urlFoto} source={{uri: item.urlFoto}} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
