import React from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/colors';

const Item = ({opcao, icon, onPress}) => {
  return (
    <TouchableHighlight style={styles.buttom} onPress={onPress}>
      <>
        <Icon name={icon} color={COLORS.primary} size={28} />
        <Text style={styles.text}>{opcao}</Text>
      </>
    </TouchableHighlight>
  );
};
export default Item;

const styles = StyleSheet.create({
  buttom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 26,
    paddingLeft: 10,
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});
