import React, {useEffect, useState, useContext} from 'react';
import {Container, TextInput, Scroll} from './styles';
import {Alert, StyleSheet, ToastAndroid} from 'react-native';
import MyButton from '../../components/MyButtom';
import Loading from '../../components/Loading';
import DeleteButton from '../../components/DeleteButton';
import {EstudanteContext} from '../../context/EstudanteProvider';
import {Image} from '@rneui/base';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ButtonGroup} from '@rneui/themed';
import {COLORS} from '../../assets/colors';

const Estudante = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlFoto, setUrlFoto] = useState('');
  const [uriImageDevice, setUriImageDevice] = useState('');
  const {save, del, sendImageToStorage} = useContext(EstudanteContext);

  useEffect(() => {
    if (route.params.value) {
      setNome(route.params.value.nome);
      setCurso(route.params.value.curso);
      setUid(route.params.value.uid);
      setUrlFoto(route.params.value.urlFoto);
    }
  }, [route]);

  useEffect(() => {}, [uriImageDevice]);

  const salvar = async () => {
    setLoading(true);
    let urlStorage = ''; //url que será salva no Firestore
    if (uriImageDevice !== '') {
      //se o usuário selecionou uma imagem, ela deve ser enviada para o Storage
      //mas antes a redimenciona e a compacta
      let imageRedimencionada = await ImageResizer.createResizedImage(
        uriImageDevice,
        150,
        200,
        'PNG',
        80,
      );
      //e prepara o path onde ela deve ser salva no storage
      const pathToStorage = `images/${uid}/${nome}/foto.jpeg`;
      //para, agora sim, enviar para o Storage
      urlStorage = await sendImageToStorage(pathToStorage, imageRedimencionada);
    }
    if (
      //e salva o registro
      await save({
        uid,
        nome,
        curso,
        urlFoto: urlStorage,
      })
    ) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
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
        console.log(path);
        setUriImageDevice(path); //armazena a uri para a imagem no device
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
        setUriImageDevice(path); //armazena a uri para a imagem no device
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
              : uriImageDevice !== ''
              ? {uri: uriImageDevice}
              : {
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
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
