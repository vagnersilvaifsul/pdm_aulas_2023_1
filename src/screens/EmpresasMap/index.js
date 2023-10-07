/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {EmpresaContext} from '../../context/EmpresaProvider';
import {useTheme, Icon, Button} from '@rneui/themed';

export default ({route, navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const {empresas} = useContext(EmpresaContext);
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          if (route.params !== undefined) {
            route.params.latitude =
              e.nativeEvent.coordinate.latitude.toString();
            route.params.longitude =
              e.nativeEvent.coordinate.longitude.toString();
            Alert.alert(
              'Show!',
              'Latitude= ' +
                e.nativeEvent.coordinate.latitude +
                '\nLongitude= ' +
                e.nativeEvent.coordinate.longitude +
                '\nConfirmar esse local?',
              [
                {
                  text: 'Não',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: () => {
                    navigation.navigate({
                      name: 'Empresa',
                      params: route.params,
                    });
                  },
                  style: 'cancel',
                },
              ],
            );
          }
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766453286495448,
          longitude: -52.351914793252945,
          latitudeDelta: 0.0015, //baseado na documentação
          longitudeDelta: 0.00121, //baseado na documentação
        }}>
        {empresas.map(empresa => {
          return (
            <Marker
              key={empresa.uid}
              coordinate={{
                latitude: Number(empresa.latitude),
                longitude: Number(empresa.longitude),
              }}
              title={empresa.nome}
              description={empresa.tecnologias}
              draggable>
              <Icon
                type="ionicon"
                name="business"
                color={
                  mapType === 'standard'
                    ? theme.colors.primary
                    : theme.colors.white
                }
                size={35}
              />
            </Marker>
          );
        })}
      </MapView>
      <Button
        title={mapType === 'standard' ? 'Padrão' : 'Satélite'}
        onPress={() =>
          mapType === 'standard'
            ? setMapType('satellite')
            : setMapType('standard')
        }
        containerStyle={{
          width: '35%',
          backgroundColor: theme.colors.transparent,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.transparent,
          borderColor:
            mapType === 'standard' ? theme.colors.primary : theme.colors.white,
          borderWidth: 1,
        }}
        titleStyle={{
          color:
            mapType === 'standard' ? theme.colors.primary : theme.colors.white,
        }}
      />
    </View>
  );
};
