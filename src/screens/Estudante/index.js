import React, {useEffect, useState, useContext} from 'react';
import {Container, TextInput, Scroll} from './styles';
import {Alert, StyleSheet, ToastAndroid} from 'react-native';
import MyButton from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/DeleteButton';
import {EstudanteContext} from '../../context/EstudanteProvider';
import {Image} from '@rneui/base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ButtonGroup} from '@rneui/themed';
import {COLORS} from '../../assets/colors';

const Estudante = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlFoto, setUrlFoto] = useState('');
  const [urlDevice, setUrlDevice] = useState('');
  const {save, del} = useContext(EstudanteContext);

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
            const pathStorageToDelete = `images/${curso}/${nome}/foto.png`;
            if (await del(uid, pathStorageToDelete)) {
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

  const buscaNaGaleria = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
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
            urlFoto !== ''
              ? {uri: urlFoto}
              : urlDevice !== ''
              ? {uri: urlDevice}
              : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/pdm-aulas-797c8.appspot.com/o/images%2Fperson.png?alt=media&token=2be8523f-4c17-4a09-afbb-301a95a5ddfb&_gl=1*18jiiyk*_ga*MjA2NDY5NjU3NS4xNjg4MTI5NjYw*_ga_CW55HF8NVT*MTY5NjAyMzQxOS4zMS4xLjE2OTYwMjU4NzQuMzMuMC4w',
                }
          }
          containerStyle={styles.image}
          PlaceholderContent={<Loading />}
        />
        <ButtonGroup
          buttons={['Buscar na Galeria', 'Tira Foto']}
          onPress={v => buscarImagemNoDevice(v)}
          containerStyle={styles.buttonGroup}
          textStyle={{color: COLORS.primary}}
        />
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
    </Scroll>
  );
};
export default Estudante;

//estilo aplicado em componentes RNE
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    marginBottom: 10,
    borderColor: COLORS.primaryDark,
  },
});
