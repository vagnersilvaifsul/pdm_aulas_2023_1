import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Card, Text} from '@rneui/themed';
import OutlineButton from '../../components/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.mode === 'light' ? theme.colors.primaryDark : theme.colors.black,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.mode === 'light' ? theme.colors.primaryDark : theme.colors.black,
      fontSize: 20,
      fontWeight: 'bold',
    },
    divider: {
      width: 260,
    },
    div_tecnologias: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tecnologias: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 16,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_tecnologias}>
        <Text style={styles.tecnologias}>{item.tecnologias}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} onClick={onPress} />
    </Card>
  );
};
