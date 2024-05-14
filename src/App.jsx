import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './applications/root.state';
import MainNavigation from './applications/navigations/root.stack';
import {NativeBaseProvider, extendTheme} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// import codePush from 'react-native-code-push';

Icon.loadFont();
const Stack = createNativeStackNavigator();
const ColorTheme = {
  primary: {
    50: '#fff1f2',
    100: '#ffe0e2',
    200: '#ffc6c9',
    300: '#ff9fa4',
    400: '#ff676f',
    500: '#fb3640',
    600: '#e91924',
    700: '#c4111a',
    800: '#a21219',
    900: '#86161c',
    950: '#490609',
  },
};
const theme = extendTheme(ColorTheme);
function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainNavigation />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
