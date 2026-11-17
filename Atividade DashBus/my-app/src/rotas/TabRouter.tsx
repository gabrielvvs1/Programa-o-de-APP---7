import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboards';
import LinhasStack from './LinhasStack';
import Analises from '../screens/Analises';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabRouter() {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons8-layout-do-painel-24.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Linhas"
        component={LinhasStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons8-gráfico-de-linha-48.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Análises"
        component={Analises}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons8-arrecadação-50.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}