import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {EstudanteContext} from '../../context/EstudanteProvider';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';

const Estudantes = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);
  estudantes;
  const [estudantesTemp, setEstudantesTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...estudantes.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setEstudantesTemp(a);
      }
    } else {
      setEstudantesTemp([]);
    }
  };

  const routeStudent = value => {
    navigation.navigate('Estudante', {
      value,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar setSearch={filterByName} />
      {/* {estudantesTemp.length > 0
        ? estudantesTemp.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))
        : estudantes.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))} */}
      <FlatList
        data={estudantesTemp.length > 0 ? estudantesTemp : estudantes}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeStudent(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
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
