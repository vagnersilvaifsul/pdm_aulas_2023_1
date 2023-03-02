import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Text} from './styles';

const Home = () => {
  const [cont, setCont] = useState(0);

  //useEffect(() => {}, []);
  //criação do componente
  useEffect(() => {
    console.log('chamou na criação do componente');

    return () => {
      console.log('chamou ao destruir o componente');
    };
  }, []);

  //na atualização do componente
  useEffect(() => {
    console.log('chamou na atualização do componente');
  }, [cont]);

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
export default Home;
