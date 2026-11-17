import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Recorrencia } from '../types';
import { styles } from '../styles';

interface Props {
  onAdicionar: (
    titulo: string,
    descricao: string,
    hora: number,
    minuto: number,
    recorrencia: Recorrencia
  ) => Promise<void>;
}

export default function CadastroScreen({ onAdicionar }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [hora, setHora] = useState('');
  const [minuto, setMinuto] = useState('');
  const [recorrencia, setRecorrencia] = useState<Recorrencia>('unica');

  async function salvar() {
    const h = Number(hora);
    const m = Number(minuto);

    if (titulo.trim() === '') {
      Alert.alert('Atenção', 'Digite o título do lembrete.');
      return;
    }
    if (hora === '' || minuto === '' || isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      Alert.alert('Atenção', 'Digite um horário válido (hora 0-23 e minuto 0-59).');
      return;
    }

    await onAdicionar(titulo, descricao, h, m, recorrencia);

    setTitulo('');// limpa os campos
    setDescricao('');
    setHora('');
    setMinuto('');
    setRecorrencia('unica');
    Alert.alert('Pronto!', 'Lembrete agendado.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar Direito Penal"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Teoria do crime"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Horário</Text>
      <View style={styles.linha}>
        <TextInput
          style={[styles.input, styles.inputHora]}
          placeholder="Hora"
          keyboardType="numeric"
          maxLength={2}
          value={hora}
          onChangeText={setHora}
        />
        <Text style={styles.doisPontos}>:</Text>
        <TextInput
          style={[styles.input, styles.inputHora]}
          placeholder="Min"
          keyboardType="numeric"
          maxLength={2}
          value={minuto}
          onChangeText={setMinuto}
        />
      </View>

      <Text style={styles.label}>Repetição</Text>
      <View style={styles.linha}>
        <View style={styles.botaoMetade}>
          <Button
            title={recorrencia === 'unica' ? '✔ Única' : 'Única'}
            onPress={() => setRecorrencia('unica')}
            color={recorrencia === 'unica' ? '#1e6fd9' : '#999'}
          />
        </View>
        <View style={styles.botaoMetade}>
          <Button
            title={recorrencia === 'diaria' ? '✔ Diária' : 'Diária'}
            onPress={() => setRecorrencia('diaria')}
            color={recorrencia === 'diaria' ? '#1e6fd9' : '#999'}
          />
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Agendar lembrete" onPress={salvar} color="#2e7d32" />
      </View>
    </View>
  );
}