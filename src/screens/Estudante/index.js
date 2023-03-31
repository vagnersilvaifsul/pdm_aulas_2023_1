import React, {useState} from 'react';
import {Container, TextInput} from './styles';
import MyButton from '../../components/MyButtom';
import Loading from '../../components/Loading';

const Estudante = props => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(props.route.params);

  return (
    <Container>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={curso}
      />
      <MyButton
        text="Salvar"
        onClick={() => {
          'foi';
        }}
      />
      {loading && <Loading />}
    </Container>
  );
};

export default Estudante;
