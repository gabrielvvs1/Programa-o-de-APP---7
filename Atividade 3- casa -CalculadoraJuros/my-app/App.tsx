import { StyleSheet, Text, View, Button ,TextInput, Switch} from 'react-native';
import { useState } from 'react';

const juros={
  melhorAmigo: 10,
  amigo:15,
  colega: 20,
  desconhecido:30
}

const CategoriaNomes = {
  melhorAmigo:'Melhor Amigo (10%)',
  amigo:'Amigo (15%)',
  colega:'Colega (20%)',
  desconhecido:'Desconhecido (30%)'
}


export default function App() {
  const [valorEmprestado, setValorEmprestado] = useState('');
  const [categoria, setCategoria] = useState<keyof typeof juros>('melhorAmigo');
  const [arredondar, setArredondar] = useState(false);
  const [resultado, setResultado] = useState(0);


  function calcular() {
    const valor = Number(valorEmprestado);
 
    if (isNaN(valor)) {
      setResultado(0);
      return;
    }
    
     const porcentagem = juros[categoria];
    let total = valor + (valor * porcentagem) / 100;
 
    if (arredondar) {
      total = Math.round(total);
    }
 
    setResultado(total);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de juros</Text>
 
      <TextInput
        style={styles.input}
        placeholder="Valor do Dinheiro emprestado"
        keyboardType="numeric"
        value={valorEmprestado}
        onChangeText={setValorEmprestado}
      />
 
      <Text style={styles.pergunta}>Nivel de amizade?</Text>
 
      <View style={styles.botoesCategoria}>
        <View style={styles.botaoCategoria}>
          <Button title="Melhor amigo" onPress={() => setCategoria('melhorAmigo')} />
        </View>
        <View style={styles.botaoCategoria}>
          <Button title="Amigo" onPress={() => setCategoria('amigo')} />
        </View>
        <View style={styles.botaoCategoria}>
          <Button title="Colega" onPress={() => setCategoria('colega')} />
        </View>
        <View style={styles.botaoCategoria}>
          <Button title="Desconhecido" onPress={() => setCategoria('desconhecido')} />
        </View>
      </View>
 
      <Text style={styles.selecionado}>Selecionado: {CategoriaNomes[categoria]}</Text>
 
      <View style={styles.linhaSwitch}>
        <Text>Arredondar valor?</Text>
        <Switch value={arredondar} onValueChange={setArredondar} />
      </View>
 
      <Text style={styles.label}>A pessoa deve te pagar:</Text>
      <Text style={styles.resultado}>R$ {resultado.toFixed(2)}</Text>
 
      <Button title="Calcular" onPress={calcular} color="#229154" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#d1ddd9',
  },
  titulo: {
    top: -75,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
    fontSize: 15,
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  pergunta: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  botoesCategoria: {
    marginBottom: 10,
  },
  botaoCategoria: {
    width: '67%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  selecionado: {
    fontSize: 14,
    marginBottom: 20,
  },
  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#0e0d0d',
  },
  resultado: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#41b467',
    marginBottom: 20,
  },
});