import React from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/colors';

const Item = ({opcao, icon, onPress}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <>
        <Icon name={icon} color={COLORS.primary} size={20} />
        <Text style={styles.text}>{opcao}</Text>
      </>
    </TouchableHighlight>
  );
};
export default Item;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 'auto',
    padding: 10,
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    paddingLeft: 10,
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});
