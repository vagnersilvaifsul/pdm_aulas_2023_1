import React, {useEffect, useState, useContext} from 'react';
import {Container, TextInput} from './styles';
import {Alert, ToastAndroid} from 'react-native';
import MyButton from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/DeleteButton';
import {EstudanteContext} from '../../context/EstudanteProvider';

const Estudante = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(EstudanteContext);

  useEffect(() => {
    if (route.params.value) {
      setNome(route.params.value.nome);
      setCurso(route.params.value.curso);
      setUid(route.params.value.uid);
    }
  }, [route]);

  const salvar = async () => {
    setLoading(true);
    if (
      await save({
        uid,
        nome,
        curso,
      })
    ) {
      setLoading(false);
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      navigation.goBack();
    } else {
      setLoading(false);
      ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o aluno?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            if (await del(uid)) {
              ToastAndroid.show(
                'Ordem dada é ordem cumprida',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

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
          salvar();
        }}
      />
      {uid && (
        <DeleteButton
          texto="Excluir"
          onClick={() => {
            excluir();
          }}
        />
      )}
      {loading && <Loading />}
    </Container>
  );
};

export default Estudante;
