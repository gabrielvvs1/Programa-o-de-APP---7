import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// JOGO DA VELHA
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>

      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
        </View>
        <View style={styles.linha}>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
        </View>
        <View style={styles.linha}>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
          <View style={styles.celula}><Text style={styles.simbolo}></Text></View>
        </View>
      </View>
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e867b',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titulo: {
    fontFamily: 'Arial',
    fontSize: 35,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500', 
    marginTop: -100,
  },
  tabuleiro: {
    marginTop: 85,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  linha: {
    flexDirection: 'row',
  },
  celula: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  botao: {
    width: 50,
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 12,
  },
  simbolo: {
   
  },
});
