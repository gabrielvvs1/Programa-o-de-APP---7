import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaLinhas from '../screens/ListaLinhas';
import DetalhesLinha from '../screens/DetalhesLinha';

const Stack = createNativeStackNavigator();

export default function LinhasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaLinhas" component={ListaLinhas} />
      <Stack.Screen
        name="DetalhesLinha"
        component={DetalhesLinha}
        options={{ presentation: 'modal' }}
      />

    </Stack.Navigator>
  )
  
}