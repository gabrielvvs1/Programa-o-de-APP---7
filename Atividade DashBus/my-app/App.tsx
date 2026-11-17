import { NavigationContainer } from '@react-navigation/native';
import TabRouter from './src/rotas/TabRouter';
// atividade 5
export default function App() {
  return (
    <NavigationContainer>
      <TabRouter />
    </NavigationContainer>
  );
}