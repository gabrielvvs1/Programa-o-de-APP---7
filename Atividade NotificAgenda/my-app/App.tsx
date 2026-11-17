import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Lembrete, Recorrencia } from './types';
import {configurarNotificacoes,agendarNotificacao,adiarNotificacao,} from './services/notificacoes';
import CadastroScreen from './screens/CadastroScreen';
import AgendadosScreen from './screens/AgendadosScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);

  useEffect(() => {
    configurarNotificacoes();

    if (Platform.OS === 'web' || typeof Notifications.addNotificationResponseReceivedListener !== 'function') {
      return;
    }

    const sub = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const acao = response.actionIdentifier;
      const content = response.notification.request.content;
      const data = (content.data as Record<string, unknown> | undefined) ?? {};
      const idLembrete = typeof data.lembreteId === 'string' ? data.lembreteId : undefined;
      const title = content.title ?? '';
      const body = content.body ?? '';

      if (acao === 'CONCLUIR') {
        await Notifications.dismissNotificationAsync(response.notification.request.identifier);

        if (idLembrete) {  // Se eh única, remove da lista. Se eh diaria continua agendada.
          setLembretes((lista) =>
            lista.filter((l) => !(l.id === idLembrete && l.recorrencia === 'unica'))
          );
        }
      }

      if (acao === 'ADIAR') {
        await Notifications.dismissNotificationAsync(response.notification.request.identifier);
        await adiarNotificacao(title, body, data);
      }
    });

    return () => sub.remove();
  }, []);

  async function adicionar(
    titulo: string,
    descricao: string,
    hora: number,
    minuto: number,
    recorrencia: Recorrencia
  ) {
    const id = Date.now().toString();
    const notificationId = await agendarNotificacao(id, titulo, descricao, hora, minuto, recorrencia);
    const novo: Lembrete = { id, titulo, descricao, hora, minuto, recorrencia, notificationId };
    setLembretes((lista) => [...lista, novo]);
  }

  async function cancelar(lembrete: Lembrete) {
    if (Platform.OS !== 'web' && typeof Notifications.cancelScheduledNotificationAsync === 'function') {
      await Notifications.cancelScheduledNotificationAsync(lembrete.notificationId);
    }
    setLembretes((lista) => lista.filter((l) => l.id !== lembrete.id));
  }

  async function cancelarTodos() {
    if (Platform.OS !== 'web' && typeof Notifications.cancelAllScheduledNotificationsAsync === 'function') {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    setLembretes([]);
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Tab.Screen name="Novo lembrete">
          {() => <CadastroScreen onAdicionar={adicionar} />}
        </Tab.Screen>
        <Tab.Screen name="Agendados">
          {() => (
            <AgendadosScreen
              lembretes={lembretes}
              onCancelar={cancelar}
              onCancelarTodos={cancelarTodos}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}