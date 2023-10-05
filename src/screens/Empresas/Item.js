import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Card, Text} from '@rneui/themed';
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
    empresa: {
      color: theme.colors.primaryDark,
      fontSize: 20,
      fontWeight: 'bold',
    },
    container_tecnologias: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tecnologias: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 16,
    },
  });

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.empresa}>{item.nome}</Card.Title>
      <Card.Divider />
      <View style={styles.container_tecnologias}>
        <Text style={styles.tecnologias}>{item.tecnologias}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
