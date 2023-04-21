import React from 'react';
import {View, TextInput} from 'react-native';

export default function ({setSearch}) {
  return (
    <View>
      <TextInput
        placeholder="digite o nome do aluno"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setSearch(t)}
      />
    </View>
  );
}
