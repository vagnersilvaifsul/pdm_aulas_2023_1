import {CommonActions} from '@react-navigation/native';
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
        onClick={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AppStack'}],
            }),
          )
        }
      />
    </View>
  );
};

export default SignIn;
