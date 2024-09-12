import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 32px;
`;

const Cursos = () => {
  return (
    <Container>
      <Text>Cursos</Text>
    </Container>
  );
};

export default Cursos;
