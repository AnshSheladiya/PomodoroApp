// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PomodoroApp from './Components/PomodoroApp';
import SettingsScreen from './Components/SettingsScreen';
import NotificationTestComponent from './Components/NotificationTestComponent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PomodoroApp"
          component={PomodoroApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Customize Timer' }}
        />
        <Stack.Screen
          name="NotificationTest"
          component={NotificationTestComponent}
          options={{ title: 'Notification Test' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
