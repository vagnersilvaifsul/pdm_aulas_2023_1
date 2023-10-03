import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import {COLORS} from '../assets/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
  },
  button: {
    height: 48,
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  title: {color: COLORS.primary},
});

const DeleteButton = ({texto, onClick}) => {
  return (
    <Button
      title={texto}
      type="outline"
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={onClick}
    />
  );
};
export default DeleteButton;
