import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {EstudanteProvider} from '../context/EstudanteProvider';
import Navigator from './Navigator';
import {ApiProvider} from '../context/ApiProvider';
import {EmpresaProvider} from '../context/EmpresasProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <EstudanteProvider>
          <EmpresaProvider>
            <Navigator />
          </EmpresaProvider>
        </EstudanteProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
