import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from './frontend/src/screens/WelcomeScreen';
import GameScreen from './frontend/src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome">
          {props => (
            <WelcomeScreen
              onStartGame={() => props.navigation.navigate('GameScreen')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
