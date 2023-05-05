/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignIn';
import Estudantes from '../screens/Estudantes';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Estudante from '../screens/Estudante';
import Empresas from '../screens/Empresas';
import Empresa from '../screens/Empresa';
import Cursos from '../screens/Cursos';
import ForgotPassWord from '../screens/ForgotPassword';
import Menu from '../screens/Menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/colors';

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

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Estudantes"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      component={Estudantes}
      name="Estudantes"
      options={{
        tabBarLabel: 'Alunos',
        tabBarIcon: () => (
          <Icon name="people" color={COLORS.primary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      component={Empresas}
      name="Empresas"
      options={{
        tabBarLabel: 'Empresas',
        tabBarIcon: () => (
          <Icon name="business" color={COLORS.primary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      component={Cursos}
      name="Cursos"
      options={{
        tabBarLabel: 'Cursos',
        tabBarIcon: () => (
          <Icon name="rocket" color={COLORS.primary} size={20} />
        ),
      }}
    />
    <Tab.Screen
      component={Menu}
      name="Menu"
      options={{
        tabBarLabel: 'Menu',
        tabBarIcon: () => <Icon name="list" color={COLORS.primary} size={20} />,
      }}
    />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen
        component={Estudante}
        name="Estudante"
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
    </Stack.Navigator>
  </NavigationContainer>
);
export default Navigator;
