import React from 'react';
import {Button} from '@rneui/themed';

const MyButtom = ({text, onClick}) => {
  return <Button title={text} onPress={onClick} />;
};
export default MyButtom;
