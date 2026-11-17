import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable} from 'react-native';

const lados = {
  1: require('./assets/lado1.jpg'),
  2: require('./assets/lado2.jpg'),
  3: require('./assets/lado3.jpg'),
  4: require('./assets/lado4.jpg'),
  5: require('./assets/lado5.jpg'),
  6: require('./assets/lado6.jpg') 
};


const frases = {
  1: 'Ataque fraco',
  2: 'Ataque normal',
  3: 'Ataque forte',
  4: 'Ataque muito forte',
  5: 'Ataque critico',
  6: 'Ataque lendario'
};

export default function App() {
  const [numero, setNumero] = useState(1);
  
  function rolarDado() {
    const novoNumero = Math.floor(Math.random() * 6) + 1;
    setNumero(novoNumero);
  }

  return (
     <View style={styles.container}>
      <Text style={styles.titulo}>DADO</Text>
      <Text style={styles.frase}>{frases[numero]}</Text>
 
      <Image source={lados[numero]} style={styles.imagem} />
 
      <Button title="Rolar Dado" onPress={rolarDado} /> 
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    marginTop: -200,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  imagem: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 24,
  },

  frase: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    
  },
});