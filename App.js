import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';


import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import LayarUtama from './screens/LayarUtama';
import EditProfile from './screens/EditProfile';
import Scan from './screens/Scan'; 
import Approval from './screens/Approval';


function Home() {
  return <Dashboard />;
}

function Profile() {
  return <EditProfile />;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        } else if (route.name === 'Scan') {
          iconName = 'qr-code-scanner'; 
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#f8f9fa' },
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{ 
        headerShown: false,  
        tabBarLabel: 'Home'     
      }} 
    />
    <Tab.Screen 
      name="Scan" 
      component={Scan} 
      options={{ 
        headerShown: false,  
        tabBarLabel: 'Scan',
        tabBarIconStyle: { 
          fontSize: 30,
        },
      }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{ 
        headerShown: false,  
        tabBarLabel: 'Akun',
      }} 
    />
  </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LayarUtama">
        <Stack.Screen name="LayarUtama" component={LayarUtama} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
        <Stack.Screen name="Approval" component={Approval} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
