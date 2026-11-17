import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View style ={styles.linha}>
        <View style={[styles.quadrado, styles.quadrado1]}>
          <Image source={{uri: "https://img.icons8.com/?size=100&id=39210&format=png&color=000000"}} style={styles.imagem}/>
          <Text style={styles.texto}>Monitor</Text>
        </View>

        <View style={[styles.quadrado, styles.quadrado2]}>
          <Image source={{uri: "https://img.icons8.com/?size=100&id=SA6OfBs2yayJ&format=png&color=000000"}} style={styles.imagem}/>
          <Text style={styles.texto}>Mouse</Text>
        </View>
    </View>

    <View style ={styles.linha}>
        <View style={[styles.quadrado, styles.quadrado3]}>
          <Image source={{uri: "https://img.icons8.com/?size=100&id=519&format=png&color=000000"}} style={styles.imagem}/>
          <Text style={styles.texto}>Teclado</Text>
        </View>
        <View style={[styles.quadrado, styles.quadrado4]}>
          <Image source={{uri: "https://img.icons8.com/?size=100&id=172&format=png&color=000000"}} style={styles.imagem}/>
          <Text style={styles.texto}>Wifi</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
  },
quadrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
quadrado1: { backgroundColor: '#2b4192' } ,
quadrado2: { backgroundColor: '#6953a8' },
quadrado3: { backgroundColor: '#7d3e91' },
quadrado4: { backgroundColor: '#367780' },
texto: {color: '#ffffff',fontSize: 20,},

imagem: {
  width: 50,
  height: 50,
},



});
