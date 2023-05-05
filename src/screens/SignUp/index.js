import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {Body, TextInput} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthUserContext);

  const cadastar = async () => {
    let msgError = '';
    if (nome !== '' && email !== '' && pass !== '' && confirPass !== '') {
      if (pass === confirPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        msgError = await signUp(user, pass);
        if (msgError === 'ok') {
          setLoading(false);
          Alert.alert(
            'Show!',
            'Foi enviado um email para:\n' +
              user.email +
              '\nFaça a verificação.',
          );
          navigation.goBack();
        } else {
          setLoading(false);
          Alert.alert('Ops!', msgError);
        }
      } else {
        Alert.alert('Ops!', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Ops!', 'Por favor, digite todos os campos.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Senha"
        keyboardType="default"
        returnKeyType="send"
        onChangeText={t => setConfirmPass(t)}
      />
      <MyButtom text="Cadastrar" onClick={cadastar} />
      {loading && <Loading />}
    </Body>
  );
};
export default SignUp;
