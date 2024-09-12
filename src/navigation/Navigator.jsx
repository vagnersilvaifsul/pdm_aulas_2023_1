/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import SignIn from '../screens/SignIn';
import Estudantes from '../screens/Alunos';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Aluno from '../screens/Aluno';
import Empresas from '../screens/Empresas';
import Empresa from '../screens/Empresa';
import Cursos from '../screens/Cursos';
import ForgotPassWord from '../screens/ForgotPassword';
import EmpresasMap from '../screens/EmpresasMap';
import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';
import {useTheme, Icon} from '@rneui/themed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
    <Stack.Screen component={ForgotPassWord} name="ForgotPassWord" />
  </Stack.Navigator>
);

const AppStack = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Alunos"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={Estudantes}
        name="Alunos"
        options={{
          tabBarLabel: 'Alunos',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="people"
              color={
                theme.mode === 'light'
                  ? theme.colors.primary
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Empresas}
        name="Empresas"
        options={{
          tabBarLabel: 'Empresas',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="business"
              color={
                theme.mode === 'light'
                  ? theme.colors.primary
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={EmpresasMap}
        name="EmpresasMap"
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="map-sharp"
              color={
                theme.mode === 'light'
                  ? theme.colors.primary
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Cursos}
        name="Cursos"
        options={{
          tabBarLabel: 'Cursos',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="rocket"
              color={
                theme.mode === 'light'
                  ? theme.colors.primary
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="list"
              color={
                theme.mode === 'light'
                  ? theme.colors.primary
                  : theme.colors.black
              }
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
        },
        dark: theme.mode === 'light',
      }}>
      <StatusBar backgroundColor={theme.colors.primaryDark} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen
          component={Aluno}
          name="Aluno"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={Empresa}
          name="Empresa"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          component={PerfilUsuario}
          name="PerfilUsuario"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
