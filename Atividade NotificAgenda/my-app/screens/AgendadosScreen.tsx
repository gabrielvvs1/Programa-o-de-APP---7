import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Lembrete } from '../types';
import { styles } from '../styles';

interface Props {
  lembretes: Lembrete[];
  onCancelar: (lembrete: Lembrete) => Promise<void>;
  onCancelarTodos: () => Promise<void>;
}

function formatarHorario(h: number, m: number) {
  const hh = h < 10 ? '0' + h : String(h);
  const mm = m < 10 ? '0' + m : String(m);
  return hh + ':' + mm;
}

export default function AgendadosScreen({ lembretes, onCancelar, onCancelarTodos }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lembretes agendados</Text>

      {lembretes.length === 0 ? (
        <Text style={styles.vazio}>Nenhum lembrete agendado.</Text>
      ) : (
        <FlatList
          data={lembretes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              {item.descricao !== '' && <Text>{item.descricao}</Text>}
              <Text style={styles.cardInfo}>
                {item.recorrencia === 'diaria' ? 'Todo dia' : 'Única'},{' '}
                {formatarHorario(item.hora, item.minuto)}
              </Text>
              <Button title="Cancelar" color="#b00020" onPress={() => onCancelar(item)} />
            </View>
          )}
        />
      )}

      {lembretes.length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Button title="Cancelar todos" color="#e42a0a" onPress={onCancelarTodos} />
        </View>
      )}
    </View>
  );
}