import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const vidas = 5;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>

      <View style={styles.vidasContainer}>
        {Array.from({ length: vidas }).map((_, index) => (
          <Text key={index} style={styles.coracao}>❤️</Text>
        ))}
      </View>

      <View style={styles.palavra}>
        <Text style={styles.letraEspaco}></Text>
        <Text style={styles.letraEspaco}></Text>
        <Text style={styles.letraEspaco}></Text>
        <Text style={styles.letraEspaco}></Text>
        <Text style={styles.letraEspaco}></Text>
        <Text style={styles.letraEspaco}></Text>
      </View>

      <View style={styles.teclado}>
        {letras.map((letra) => (
          <View key={letra} style={styles.tecla}>
            <Text style={styles.letraTecla}>{letra}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(156, 151, 148)',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 35,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 15,
  },
  vidasContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  coracao: {
    fontSize: 28,
    marginHorizontal: 3,
  },
  palavra: {
    flexDirection: 'row',
    marginTop: 50,
  },
  letraEspaco: {
    fontSize: 28,
    color: '#ffffff',
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ffffff',
    width: 24,
    textAlign: 'center',
    marginTop: 50,
  },
  teclado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  tecla: {
    width: 40,
    height: 40,
    backgroundColor: 'rgb(65, 62, 61)',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  letraTecla: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
});