import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { linhas } from '../data/linhas';

export default function Dashboard() {
  const totalPassageiros = linhas.reduce((acc, l) => acc + l.passageiros, 0);
  const totalArrecadacao = linhas.reduce((acc, l) => acc + l.arrecadacao, 0);

  const linhaMaisPassageiros = linhas.reduce((a, b) =>
    a.passageiros > b.passageiros ? a : b
  );
  const linhaMaisAtrasos = linhas.reduce((a, b) =>
    a.percentualAtrasos > b.percentualAtrasos ? a : b
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total de linhas</Text>
        <Text style={styles.cardValue}>{linhas.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total de passageiros</Text>
        <Text style={styles.cardValue}>{totalPassageiros.toLocaleString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Arrecadação total</Text>
        <Text style={styles.cardValue}>
          R$ {totalArrecadacao.toLocaleString()}
        </Text>
      </View>

      <View style={[styles.card, styles.highlight]}>
        <Text style={styles.cardLabel}>Linha com mais passageiros</Text>
        <Text style={styles.cardValue}>
          {linhaMaisPassageiros.codigo} - {linhaMaisPassageiros.origem} →{' '}
          {linhaMaisPassageiros.destino}
        </Text>
        <Text style={styles.cardSub}>
          {linhaMaisPassageiros.passageiros.toLocaleString()} passageiros
        </Text>
      </View>

      <View style={[styles.card, styles.highlightWarning]}>
        <Text style={styles.cardLabel}>Linha com mais atrasos</Text>
        <Text style={styles.cardValue}>
          {linhaMaisAtrasos.codigo} - {linhaMaisAtrasos.origem} →{' '}
          {linhaMaisAtrasos.destino}
        </Text>
        <Text style={styles.cardSub}>
          {linhaMaisAtrasos.percentualAtrasos}% de atrasos
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  highlight: { backgroundColor: '#e8f4ff' },
  highlightWarning: { backgroundColor: '#ffefe8' },
  cardLabel: { fontSize: 13, color: '#666', marginBottom: 4 },
  cardValue: { fontSize: 18, fontWeight: '700' },
  cardSub: { fontSize: 13, color: '#888', marginTop: 4 },
});