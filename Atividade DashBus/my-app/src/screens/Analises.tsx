import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { linhas } from '../data/linhas';

export default function Analises() {
  const totalArrecadacao = linhas.reduce((acc, l) => acc + l.arrecadacao, 0);
  const maxArrecadacao = Math.max(...linhas.map((l) => l.arrecadacao));
  const linhaMaiorArrecadacao = linhas.reduce((a, b) =>
    a.arrecadacao > b.arrecadacao ? a : b
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      <Text style={styles.sectionTitle}>Arrecadação por linha</Text>
      <View style={styles.chart}>
        {linhas.map((l) => (
          <View key={l.id} style={styles.barRow}>
            <Text style={styles.barLabel}>{l.codigo}</Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${(l.arrecadacao / maxArrecadacao) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.barValue}>
              R$ {(l.arrecadacao / 1000).toFixed(1)}k
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Linha com maior arrecadação</Text>
      <View style={styles.destaqueCard}>
        <Text style={styles.destaqueCodigo}>
          {linhaMaiorArrecadacao.codigo}
        </Text>
        <Text style={styles.destaqueTrajeto}>
          {linhaMaiorArrecadacao.origem} → {linhaMaiorArrecadacao.destino}
        </Text>
        <Text style={styles.destaqueValor}>
          R$ {linhaMaiorArrecadacao.arrecadacao.toLocaleString()}
        </Text>
        <Text style={styles.destaqueSub}>
          {((linhaMaiorArrecadacao.arrecadacao / totalArrecadacao) * 100).toFixed(1)}%
          do total arrecadado
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, marginTop: 8 },
  chart: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 24 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  barLabel: { width: 55, fontSize: 12, color: '#555' },
  barTrack: {
    flex: 1,
    height: 14,
    backgroundColor: '#eee',
    borderRadius: 7,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: '#3e7bcc', borderRadius: 7 },
  barValue: { width: 55, fontSize: 12, color: '#333', textAlign: 'right' },
  destaqueCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  destaqueCodigo: { fontSize: 20, fontWeight: 'bold', color: '#3e7bcc' },
  destaqueTrajeto: { fontSize: 14, color: '#555', marginTop: 4 },
  destaqueValor: { fontSize: 26, fontWeight: '800', marginTop: 12 },
  destaqueSub: { fontSize: 13, color: '#888', marginTop: 4 },
});