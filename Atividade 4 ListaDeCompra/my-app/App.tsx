import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';


type Item = {
  id: number;
  nome: string;
  comprado: boolean;
};


type ListaContextType = {
  itens: Item[];
  adicionarItem: (nome: string) => void;
  marcarComprado: (id: number) => void;
};


const ListaContext = createContext<ListaContextType | undefined>(undefined);


function TelaLogin({ onEntrar }: { onEntrar: (nome: string) => void }) {
  const [nome, setNome] = useState('');

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginConteudo}>
        <Text style={styles.loginTitulo}>Lista de Compras</Text>

        <TextInput
          style={styles.loginInput}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Pressable style={styles.loginBotao} onPress={() => onEntrar(nome)}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}



function TelaLista({ usuario, onVoltar }: { usuario: string; onVoltar: () => void }) {
  const [itens, setItens] = useState<Item[]>([]);
  const [novoItem, setNovoItem] = useState('');
  const [busca, setBusca] = useState('');

  const adicionarItem = useCallback((nome: string) => {
    if (nome.trim() === '') return;

    const item: Item = {
      id: Date.now(),
      nome: nome,
      comprado: false,
    };

    setItens((listaAtual) => [...listaAtual, item]);
  }, []);


  const marcarComprado = useCallback((id: number) => {
    setItens((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  }, []);

  
  const itensFiltrados = useMemo(() => {
    return itens.filter((item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [itens, busca]);


  const totalPendentes = useMemo(() => {
    return itens.filter((item) => !item.comprado).length;
  }, [itens]);

  const valorDoContext = useMemo(
    () => ({ itens, adicionarItem, marcarComprado }),
    [itens, adicionarItem, marcarComprado]
  );

  return (
    <ListaContext.Provider value={valorDoContext}>
      <SafeAreaView style={styles.container}>
        <View style={styles.listaConteudo}>
          <Pressable style={styles.voltarBotao} onPress={onVoltar}>
            <Text style={styles.botaoTexto}>Voltar</Text>
          </Pressable>
          <Text style={styles.titulo}>Olá, {usuario}</Text>
          <Text style={styles.pendentes}>{totalPendentes} itens pendentes</Text>

          <View style={styles.linha}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Adicionar item"
              value={novoItem}
              onChangeText={setNovoItem}
            />
            <Pressable
              style={styles.botao}
              onPress={() => {
                adicionarItem(novoItem);
                setNovoItem('');
              }}
            >
              <Text style={styles.botaoTexto}>+</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Buscar item"
            value={busca}
            onChangeText={setBusca}
          />

          <FlatList
            data={itensFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ItemDaLista item={item} />}
          />
        </View>
      </SafeAreaView>
    </ListaContext.Provider>
  );
}

function ItemDaLista({ item }: { item: Item }) {

  const contexto = useContext(ListaContext);
  if (!contexto) return null;
  return (
    <Pressable
      style={styles.item}
      onPress={() => contexto.marcarComprado(item.id)}
    >
      <Text style={item.comprado ? styles.itemComprado : styles.itemTexto}>
        {item.comprado ? '✓ ' : ''}
        {item.nome}
      </Text>
    </Pressable>
  );
}


export default function App() {
  const [usuario, setUsuario] = useState('');

  if (usuario === '') {
    return <TelaLogin onEntrar={(nome) => setUsuario(nome)} />;
  }

  return <TelaLista usuario={usuario} onVoltar={() => setUsuario('')} />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginRight: 8,
    marginLeft: 8,
  },
  listaConteudo: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginConteudo: {
    width: '100%',
    alignSelf: 'center',
    gap: 30,
  },
  loginTitulo: {
    fontSize: 22,
    textAlign: 'center',
  },
  loginInput: {
    width: 280,
    maxWidth: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#474444',
    borderRadius: 8,
    padding: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pendentes: {
    marginBottom: 10,
    color: '#474444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cac5c5',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    marginLeft: 8,

  },
  inputFlex: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c4bebe',
    borderRadius: 8,
    padding: 10,
    marginRight: 5,
    marginLeft: 8,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 10,
    
  },
  botao: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginRight: 8,
  },
  loginBotao: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: 140,
  },
  voltarBotao: {
    backgroundColor: '#e70d0d',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 5,
    marginRight: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTexto: {
    fontSize: 16,
  },
  itemComprado: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#999',
  },
});