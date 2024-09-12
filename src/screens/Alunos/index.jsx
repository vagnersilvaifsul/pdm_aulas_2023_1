import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {AlunoContext} from '../../context/AlunoProvider';
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
  const {alunos} = useContext(AlunoContext);
  const [alunosTemp, setAlunosTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...alunos.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setAlunosTemp(a);
      }
    } else {
      setAlunosTemp([]);
    }
  };

  const routeStudent = value => {
    navigation.navigate('Aluno', {
      value,
    });
  };

  return (
    <Container>
      <SearchBar text="Quem você procura?" setSearch={filterByName} />
      {/* {estudantesTemp.length > 0
        ? estudantesTemp.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))
        : estudantes.map((v, k) => (
            <Item item={v} onPress={() => routeStudent(v)} key={k} />
          ))} */}
      <FlatList
        data={alunosTemp.length > 0 ? alunosTemp : alunos}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeStudent(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd onClick={() => routeStudent(null)} />
    </Container>
  );
};
