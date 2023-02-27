import React from 'react';
import {Text, TouchableHighlight} from 'react-native';

const MyButtom = ({text, onClick}) => {
  return (
    <TouchableHighlight onPress={onClick}>
      <Text>{text}</Text>
    </TouchableHighlight>
  );
};
export default MyButtom;
