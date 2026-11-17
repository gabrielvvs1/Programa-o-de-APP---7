import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Recorrencia } from '../types';

if (Platform.OS !== 'web' && typeof Notifications.setNotificationHandler === 'function') {
  // Faz a notificação com o app aberto
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function configurarNotificacoes() {// Ainda peede permissao e cria os botões "Concluir" e "Adiar" 
  if (Platform.OS === 'web') {
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (typeof Notifications.setNotificationCategoryAsync !== 'function') {
    return;
  }

  await Notifications.setNotificationCategoryAsync('lembrete', [
    {
      identifier: 'CONCLUIR',
      buttonTitle: 'Concluir',
      options: { opensAppToForeground: false },
    },
    {
      identifier: 'ADIAR',
      buttonTitle: 'Adiar 10 min',
      options: { opensAppToForeground: false },
    },
  ]);

  if (typeof Notifications.requestPermissionsAsync === 'function') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Ative as notificações para receber os lembretes.');
    }
  }
}

// Agenda a notificação (única ou diária) e devolve o id dela
export async function agendarNotificacao(
  id: string,
  titulo: string,
  descricao: string,
  hora: number,
  minuto: number,
  recorrencia: Recorrencia
) {
  if (Platform.OS === 'web') {
    return id;
  }

  let trigger: Notifications.NotificationTriggerInput;

  if (recorrencia === 'diaria') {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hora,
      minute: minuto,
      channelId: 'default',
    };
  } else {
    const data = new Date();
    data.setHours(hora, minuto, 0, 0);
    if (data.getTime() <= Date.now()) {
      data.setDate(data.getDate() + 1);
    }
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: data,
      channelId: 'default',
    };
  }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: descricao,
      categoryIdentifier: 'lembrete',
      data: { lembreteId: id },
    },
    trigger,
  });
}

export async function adiarNotificacao(
  titulo: string,
  descricao: string,
  data: Record<string, unknown>
) {
  if (Platform.OS === 'web') {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: descricao,
      categoryIdentifier: 'lembrete',
      data: data,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 600,
      channelId: 'default',
    },
  });
}