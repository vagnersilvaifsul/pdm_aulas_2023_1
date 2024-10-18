import React, {useEffect, useState, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButton from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/OutlineButton';
import {AlunoContext} from '../../context/AlunoProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTheme, Image, ButtonGroup, Input, Icon} from '@rneui/themed';

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
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlFoto, setUrlFoto] = useState('');
  const [urlDevice, setUrlDevice] = useState('');
  const {save, del} = useContext(AlunoContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (route.params.value) {
      setNome(route.params.value.nome);
      setCurso(route.params.value.curso);
      setUid(route.params.value.uid);
      setUrlFoto(route.params.value.urlFoto);
    }
  }, [route]);

  useEffect(() => {}, [urlDevice]);

  const salvar = async () => {
    setLoading(true);
    if (
      //e salva o registro
      await save(
        {
          uid,
          nome,
          curso,
          urlFoto: urlFoto,
        },
        urlDevice,
      )
    ) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      setUrlDevice('');
      setCurso('');
      navigation.goBack();
    } else {
      ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  const excluir = async () => {
    Alert.alert('Opa! Fique esperto.', 'Você tem certeza que deseja excluir o aluno?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          const pathStorageToDelete = `images/${curso}/${nome}/foto.png`;
          if (await del(uid, pathStorageToDelete)) {
            ToastAndroid.show('Ordem dada é ordem cumprida', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  const buscaNaGaleria = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response.assets[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };

  function tiraFoto() {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response?.assets[0]?.uri;
        //console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }

  function buscarImagemNoDevice(v) {
    switch (v) {
      case 0:
        buscaNaGaleria();
        break;
      case 1:
        tiraFoto();
        break;
    }
  }

  return (
    <Scroll>
      <Container>
        <Image
          source={
            urlDevice !== ''
              ? {uri: urlDevice}
              : urlFoto !== ''
              ? {uri: urlFoto}
              : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/pdm-aulas-797c8.appspot.com/o/images%2Fperson.png?alt=media&token=2be8523f-4c17-4a09-afbb-301a95a5ddfb&_gl=1*18jiiyk*_ga*MjA2NDY5NjU3NS4xNjg4MTI5NjYw*_ga_CW55HF8NVT*MTY5NjAyMzQxOS4zMS4xLjE2OTYwMjU4NzQuMzMuMC4w',
                }
          }
          PlaceholderContent={<Loading />}
        />
        <ButtonGroup
          buttons={['Buscar na Galeria', 'Tira Foto']}
          onPress={v => buscarImagemNoDevice(v)}
          containerStyle={{
            borderColor: theme.mode === 'light' ? theme.colors.primary : theme.colors.black,
            backgroundColor: theme.colors.white,
          }}
          textStyle={{
            color: theme.mode === 'light' ? theme.colors.primary : theme.colors.black,
          }}
        />
        <Input
          placeholder="Nome"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon type="ionicon" name="person-outline" size={22} color={theme.colors.grey2} />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Curso"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon type="ionicon" name="rocket-outline" size={22} color={theme.colors.grey2} />
          }
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
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
