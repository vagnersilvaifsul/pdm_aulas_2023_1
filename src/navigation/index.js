import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {EstudanteProvider} from '../context/EstudanteProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {EmpresaProvider} from '../context/EmpresaProvider';
import {UserProvider} from '../context/UserProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UserProvider>
          <EstudanteProvider>
            <EmpresaProvider>
              <Navigator />
            </EmpresaProvider>
          </EstudanteProvider>
        </UserProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
