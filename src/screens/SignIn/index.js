import React from 'react';
import {View, Text} from 'react-native';
import MyButtom from '../../components/MyButtom';

// import { Container } from './styles';

const SignIn = ({navigation}) => {
  return (
    <View>
      <Text>SignIn</Text>
      <MyButtom
        text="mude de screen"
        onClick={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default SignIn;
