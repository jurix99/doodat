import React from 'react';
import { Screen } from './src/components';
import { AppHome } from './src/screens/AppHome';
import { AppStoreProvider } from './src/store/AppStore';

export default function App() {
  return (
    <AppStoreProvider>
      <Screen>
        <AppHome />
      </Screen>
    </AppStoreProvider>
  );
}
