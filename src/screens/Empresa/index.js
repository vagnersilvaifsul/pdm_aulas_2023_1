import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput} from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {EmpresaContext} from '../../context/EmpresaProvider';

const Empresa = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [tecnologias, setTeconologias] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCompany, updateCompany, deleteCompany} =
    useContext(EmpresaContext);

  useEffect(() => {
    //console.log(route.params.company);
    if (route.params.company) {
      setNome(route.params.company.nome);
      setTeconologias(route.params.company.tecnologias);
      setUid(route.params.company.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (nome && tecnologias) {
      let company = {};
      company.uid = uid;
      company.nome = nome;
      company.tecnologias = tecnologias;
      setLoading(true);
      if (uid) {
        if (await updateCompany(company)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await saveCompany(company)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir o curso?',
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
            if (await deleteCompany(uid)) {
              ToastAndroid.show(
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
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
        placeholder="Nome da Empresa"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Tecnologias (separadas por , )"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setTeconologias(t)}
        value={tecnologias}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Empresa;
