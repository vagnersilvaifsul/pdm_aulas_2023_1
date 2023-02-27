import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MyButtom from './src/components/MyButtom';

const App = () => {
  const [cont, setCont] = useState(0);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  return (
    <View>
      <Text>Contador: {cont}</Text>
      <MyButtom text="Incrementar" onClick={incrementar} />
      <MyButtom text="Decrementar" onClick={decrementar} />
    </View>
  );
};

export default App;
