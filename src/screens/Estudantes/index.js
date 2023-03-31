import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {EstudanteContext} from '../../context/EstudanteProvider';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';

const Estudantes = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);

  useEffect(() => {
    console.log('useEffect, Estudantes');
    console.log(estudantes);
  }, [estudantes]);

  const routeStudent = value => {
    navigation.navigate('Estudante', {
      value,
    });
  };

  return (
    <View style={styles.container}>
      {estudantes.map((v, k) => {
        return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
      })}
      <AddFloatButton onClick={() => routeStudent(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
export default Estudantes;
