import React, {useContext, useState} from 'react';
import {Body, TextInput, Text} from './styles';
import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';

const PerfilUsuario = () => {
  const {user} = useContext(AuthUserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNePassConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Body>
      <Text>Perfil do Usuário</Text>
      <TextInput
        value={user.nome}
        placeholder="nome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        value={user.email}
        editable={false}
        placeholder="email"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
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
      <MyButtom text="Salvar" onClick={() => alert('Em desenvolvimento')} />
      {loading && <Loading />}
    </Body>
  );
};

export default PerfilUsuario;
