import React from 'react';
import {View, TextInput} from 'react-native';

export default function ({text, setSearch}) {
  return (
    <View>
      <TextInput
        placeholder={text}
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setSearch(t)}
      />
    </View>
  );
}
