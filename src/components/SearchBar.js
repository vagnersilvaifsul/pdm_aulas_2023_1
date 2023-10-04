import React from 'react';
import {Platform} from 'react-native';
import {useTheme, SearchBar} from '@rneui/themed';

export default ({text, setSearch}) => {
  const {theme} = useTheme();
  return (
    <SearchBar
      placeholder={text}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
      searchIcon={{
        type: 'ionicon',
        name: 'search',
        size: 22,
        color: theme.colors.grey4,
      }}
      clearIcon={{type: 'ionicon', name: 'close', color: theme.colors.grey4}}
      cancelIcon={{
        type: 'ionicon',
        name: 'arrow-back',
        color: theme.colors.grey4,
      }}
      returnKeyType="next"
      onChangeText={t => setSearch(t)}
    />
  );
};
