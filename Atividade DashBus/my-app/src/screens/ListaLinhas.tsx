import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { linhas } from '../data/linhas';

export default function ListaLinhas({ navigation }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={linhas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() =>
              navigation.navigate('DetalhesLinha', { linhaId: item.id })
            }
          >
            <Text style={styles.codigo}>{item.codigo}</Text>
            <Text style={styles.trajeto}>
              {item.origem} → {item.destino}
            </Text>
            <View style={styles.row}>
              <Text style={styles.info}>🚌 {item.qtdOnibus}</Text>
              <Text style={styles.info}>👥 {item.passageiros}</Text>
              <Text style={styles.info}>⏱ {item.tempoMedio} min</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee8e8' },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  codigo: { fontSize: 16, fontWeight: 'bold', color: '#1976d2' },
  trajeto: { fontSize: 14, marginTop: 4, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  info: { fontSize: 13, color: '#555' },
});