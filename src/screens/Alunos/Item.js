import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.primaryDark,
    },
    divider: {
      width: 260,
    },
    div_estudante: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    foto: {
      width: 50,
      height: 50,
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
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.curso}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_estudante}>
        <Image containerStyle={styles.foto} source={{uri: item.urlFoto}} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
