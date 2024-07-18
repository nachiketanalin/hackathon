// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Info from './screens/Info';
import AINurse from './screens/AINurse';
import Social from './screens/Social';
import Alert from './screens/Alert';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Info') {
              iconName = focused
                ? 'bookmark'
                : 'bookmark-outline';
            } else if (route.name === 'AINurse') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            } else if (route.name === 'Social') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name == 'Alert') {
              iconName = focused ? 'alarm' : 'alarm-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="AINurse" component={AINurse} />
        <Tab.Screen name="Social" component={Social} />
        <Tab.Screen name="Alert" component={Alert}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


