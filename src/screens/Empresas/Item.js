import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.primary};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextNome = styled.Text`
  font-size: 24px;
  color: ${COLORS.white};
`;

const TextTecnologias = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.white};
`;

const Item = ({item, onPress}) => {
  //console.log(item);
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.nome}</TextNome>
        <TextTecnologias>{item.tecnologias}</TextTecnologias>
      </>
    </Button>
  );
};
export default Item;
