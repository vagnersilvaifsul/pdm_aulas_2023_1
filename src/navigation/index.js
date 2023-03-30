import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {EstudanteProvider} from '../context/EstudanteProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <EstudanteProvider>
        <Navigator />
      </EstudanteProvider>
    </AuthUserProvider>
  );
}
