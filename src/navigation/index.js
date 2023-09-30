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
    primary: COLORS.white,
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
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
