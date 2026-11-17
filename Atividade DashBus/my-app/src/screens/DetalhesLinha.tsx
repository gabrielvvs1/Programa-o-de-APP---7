import { Pressable, StyleSheet, Text, View } from 'react-native';
import { linhas } from '../data/linhas';

export default function DetalhesLinha({ route, navigation }: any) {
  const { linhaId } = route.params;
  const linha = linhas.find((l) => l.id === linhaId)!;

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <Text style={styles.codigo}>{linha.codigo}</Text>
      <Text style={styles.trajeto}>
        {linha.origem} → {linha.destino}
      </Text>

      <View style={styles.grid}>
        <DetalheItem label="Ônibus na linha" valor={`${linha.qtdOnibus}`} />
        <DetalheItem label="Passageiros" valor={`${linha.passageiros}`} />
        <DetalheItem label="Tempo médio" valor={`${linha.tempoMedio} min`} />
        <DetalheItem
          label="% de atrasos"
          valor={`${linha.percentualAtrasos}%`}
        />
        <DetalheItem
          label="Ocupação média"
          valor={`${linha.ocupacaoMedia}%`}
        />
        <DetalheItem
          label="Arrecadação"
          valor={`R$ ${linha.arrecadacao.toLocaleString()}`}
        />
      </View>

      <Pressable style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Fechar</Text>
      </Pressable>
    </View>
  );
}

function DetalheItem({ label, valor }: { label: string; valor: string }) {
  return (
    <View style={styles.detalheItem}>
      <Text style={styles.detalheLabel}>{label}</Text>
      <Text style={styles.detalheValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 16,
  },
  codigo: { fontSize: 22, fontWeight: 'bold', color: '#1976d2' },
  trajeto: { fontSize: 16, color: '#555', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  detalheItem: {
    width: '47%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 14,
  },
  detalheLabel: { fontSize: 12, color: '#777' },
  detalheValor: { fontSize: 17, fontWeight: '700', marginTop: 4 },
  botao: {
    marginTop: 32,
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
});