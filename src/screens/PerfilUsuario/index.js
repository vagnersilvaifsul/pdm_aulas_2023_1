import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Body, TextInput, Text} from './styles';
import MyButtom from '../../components/MyButtom';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {UserContext} from '../../context/UserProvider';
import {CommonActions} from '@react-navigation/native';

const PerfilUsuario = ({navigation}) => {
  const {user} = useContext(AuthUserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNePassConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);

    }
  }, [user]);

  function salvar() {
    if (oldPass === '' && newPass === '' && newPassConfirm === '') {
      Alert.alert(
        'Fique Esperto!',
        'Você tem certeza que deseja alterar estes dados?',
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
              /*
                Para evitar que dados sensíveis sejam enviados para
                o Firestore, um novo objeto é criado.
              */
              let localUser = {};
              localUser.uid = user.uid;
              localUser.nome = nome;
              if (await save(localUser)) {
                ToastAndroid.show(
                  'Show! Você salvou os dados com sucesso.',
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
              }
              setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }

  function excluir() {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir permanentemente sua conta?\nSe você confirmar essa operação seus dados serão excluídos e você não terá mais acesso ao app.',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            Alert.alert(
              'Que pena :-(',
              `Você tem certeza que deseja excluir seu perfil de usuário ${user.email}?`,
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
                    if (await del(user.uid)) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: 'AuthStack'}],
                        }),
                      );
                    } else {
                      ToastAndroid.show(
                        'Ops! Erro ao exlcluir sua conta. Contate o administrador.',
                        ToastAndroid.LONG,
                      );
                    }
                    setLoading(false);
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }

  return (
    <Body>
      <Text>Perfil do Usuário</Text>
      <TextInput
        value={nome}
        placeholder="nome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        value={email}
        editable={false}
        placeholder="email"
        keyboardType="default"
        returnKeyType="next"
      />
      <TextInput
        value={oldPass}
        secureTextEntry={true}
        placeholder="Senha antiga"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setOldPass(t)}
      />
      <TextInput
        value={newPass}
        secureTextEntry={true}
        placeholder="Nova senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNewPass(t)}
      />
      <TextInput
        value={newPassConfirm}
        secureTextEntry={true}
        placeholder="Confirme a nova senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNePassConfirm(t)}
      />
      <MyButtom text="Salvar" onClick={salvar} />
      <DeleteButton texto="Excluir Conta" onClick={excluir} />
      {loading && <Loading />}
    </Body>
  );
};

export default PerfilUsuario;
