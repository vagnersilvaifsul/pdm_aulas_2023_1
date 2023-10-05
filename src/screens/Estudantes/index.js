import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {EstudanteContext} from '../../context/EstudanteProvider';
import Item from './Item';
import FloatButtonAdd from '../../components/FloatButtonAdd';
import SearchBar from '../../components/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);
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
    <Container>
      <SearchBar text="Pesquise pelo nome do aluno" setSearch={filterByName} />
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
      <FloatButtonAdd onClick={() => routeStudent(null)} />
    </Container>
  );
};
