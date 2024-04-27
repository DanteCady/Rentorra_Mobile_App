import React from 'react';
import { PaperProvider } from 'react-native-paper';
import RootNavigator from './src/navigation/rootNavigator';
import theme from './src/styles/theme';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
    </PaperProvider>
  );
}

export default App;
