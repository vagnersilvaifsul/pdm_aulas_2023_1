import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {EstudanteProvider} from '../context/EstudanteProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {EmpresaProvider} from '../context/EmpresaProvider';
import {UserProvider} from '../context/UserProvider';
import {NotificationsProvider} from '../context/NotificationsProvider';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {COLORS} from '../assets/colors';

const theme = createTheme({
  lightColors: {
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark,
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary,
    background: COLORS.white,
    error: COLORS.errror,
  },
  darkColors: {
    primary: COLORS.primary,
    secondary: COLORS.accent,
  },
  mode: 'light',
  components: {
    Button: {
      containerStyle: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        margin: 10,
        backgroundColor: COLORS.accent,
        borderRadius: 5,
      },
      buttonStyle: {
        backgroundColor: COLORS.accent,
        borderRadius: 3,
      },
      titleStyle: {color: COLORS.white},
    },
    ButtonGroup: {
      containerStyle: {
        marginBottom: 10,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.white,
      },
      textStyle: {color: COLORS.primary},
    },
  },
});

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <NotificationsProvider>
          <ApiProvider>
            <UserProvider>
              <EstudanteProvider>
                <EmpresaProvider>
                  <Navigator />
                </EmpresaProvider>
              </EstudanteProvider>
            </UserProvider>
          </ApiProvider>
        </NotificationsProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
}
