import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButtom from '../../components/MyButtom';
import OutlineButton from '../../components/OutlineButton';
import Loading from '../../components/Loading';
import {EmpresaContext} from '../../context/EmpresaProvider';
import {useTheme, Input, Icon} from '@rneui/themed';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [tecnologias, setTeconologias] = useState('');
  const [uid, setUid] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveCompany, updateCompany, deleteCompany} =
    useContext(EmpresaContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (route.params.empresa) {
      setUid(route.params.empresa.uid);
      setNome(route.params.empresa.nome);
      setTeconologias(route.params.empresa.tecnologias);
      setLatitude(route.params.empresa.latitude);
      setLongitude(route.params.empresa.longitude);
    }
  }, [route]);

  const salvar = async () => {
    if (nome && tecnologias && latitude && longitude) {
      let company = {};
      company.uid = uid;
      company.nome = nome;
      company.tecnologias = tecnologias;
      company.latitude = latitude;
      company.longitude = longitude;
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
    <Scroll>
      <Container>
        <Input
          placeholder="Nome da Empresa"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="business-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Tecnologias (separadas por , )"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="list-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setTeconologias(t)}
          value={tecnologias}
        />
        <Input
          placeholder="Latitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setTeconologias(t)}
          value={latitude}
        />
        <Input
          placeholder="Longitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="material-community"
              name="map-marker-check-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setTeconologias(t)}
          value={longitude}
        />
        <MyButtom text="Salvar" onClick={salvar} />
        {uid ? <OutlineButton texto="Excluir" onClick={excluir} /> : null}
        <OutlineButton
          texto="Obter Coordenadas no Mapa"
          onClick={() =>
            navigation.navigate('EmpresasMap', {
              empresa: {
                uid,
                nome,
                tecnologias,
                latitude,
                longitude,
              },
            })
          }
        />
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
