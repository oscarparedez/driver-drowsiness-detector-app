import React from 'react';
import { Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import { AppContextProvider } from './src/Contexts/AppContextProvider';
import { AuthContextProvider } from './src/Contexts/AuthContextProvider';
import { NetworkContext, NetworkContextProvider } from './src/Contexts/NetworkContextProvider';
import { TimerContextProvider } from './src/Contexts/TimerContext';

const App = (): JSX.Element => {
  const AppNavigator = require('./src/Navigators/AppNavigator').default;
  return (
    <RecoilRoot>
      <TimerContextProvider>
        <NetworkContextProvider>
          <AuthContextProvider>
            <AppContextProvider>
              <AppNavigator />
            </AppContextProvider>
          </AuthContextProvider>
        </NetworkContextProvider>
      </TimerContextProvider>
    </RecoilRoot>
  )
}

export default App;