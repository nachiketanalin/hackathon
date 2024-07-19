import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Info from './screens/Info';
import AINurse from './screens/AINurse';
import Social from './screens/Social';
import Alert from './screens/Alert';
import ProximityAlarm from './screens/ProximityAlarm';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Info') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'AINurse') {
              iconName = focused ? 'medkit' : 'medkit-outline';
            } else if (route.name === 'Social') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Alert') {
              iconName = focused ? 'alarm' : 'alarm-outline';
            } else if (route.name === 'Track') {
              iconName = focused ? 'pin' : 'pin-outline';
            }

            return <Ionicons name={iconName} size={size + 10} color={color} />; // Increase icon size
          },
          tabBarActiveTintColor: '#0074D9',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 14, // Increase label size
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="AINurse" component={AINurse} />
        <Tab.Screen name="Social" component={Social} />
        <Tab.Screen name="Alert" component={Alert} />
        <Tab.Screen name="Track" component={ProximityAlarm} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
