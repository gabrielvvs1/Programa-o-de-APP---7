
import React, { useEffect, useRef, useState } from "react";
import {View,Text,Image,FlatList,ActivityIndicator,StyleSheet,SafeAreaView,StatusBar,} from "react-native";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

type PokemonAPI = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

const LIMITE = 20;

const cores: Record<string, string> = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [temMais, setTemMais] = useState(true);

  const pagina = useRef(0);
  const buscando = useRef(false);

  async function buscarPokemons() {
    if (buscando.current || !temMais) return;

    buscando.current = true;
    setCarregando(true);
    setErro(null);

    try {
      const offset = pagina.current * LIMITE;

      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMITE}&offset=${offset}`
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar Pokémon");
      }

      const dados = await resposta.json();

      const detalhes: Pokemon[] = await Promise.all(
        dados.results.map(async (item: { url: string }) => {
          const respostaPokemon = await fetch(item.url);

          if (!respostaPokemon.ok) {
            throw new Error("Erro ao buscar detalhes");
          }

          const pokemon: PokemonAPI =
            await respostaPokemon.json();

          return {
            id: pokemon.id,
            name: pokemon.name,
            image:
              pokemon.sprites.other["official-artwork"]
                .front_default ||
              pokemon.sprites.front_default ||
              "",
            types: pokemon.types.map(
              (t) => t.type.name
            ),
          };
        })
      );

      setPokemons((anteriores) => [
        ...anteriores,
        ...detalhes,
      ]);

      pagina.current += 1;
      setTemMais(dados.next !== null);
    } catch (e) {
      setErro("Não foi possível carregar os Pokémon.");
    } finally {
      buscando.current = false;
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarPokemons();
  }, []);

  function renderPokemon({ item }: { item: Pokemon }) {
    return (
      <View style={styles.card}>
        <Text style={styles.numero}>
          #{String(item.id).padStart(3, "0")}
        </Text>

        <Image
          source={{ uri: item.image }}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.nome}>
          {item.name.charAt(0).toUpperCase() +
            item.name.slice(1)}
        </Text>

        <View style={styles.tipos}>
          {item.types.map((tipo) => (
            <View
              key={tipo}
              style={[
                styles.tipo,
                { backgroundColor: cores[tipo] || "#777" },
              ]}
            >
              <Text style={styles.textoTipo}>
                {tipo.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Pokédex</Text>
        <Text style={styles.subtitulo}>
          Todas as gerações
        </Text>
      </View>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.linha}
        onEndReached={buscarPokemons}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          <View style={styles.rodape}>
            {carregando && (
              <ActivityIndicator
                size="large"
                color="#E53935"
              />
            )}

            {erro && (
              <Text
                style={styles.erro}
                onPress={buscarPokemons}
              >
                {erro} Toque para tentar novamente.
              </Text>
            )}

            {!temMais && (
              <Text>Todos os Pokémon foram carregados!</Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  cabecalho: {
    backgroundColor: "#4dbe18",
    padding: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitulo: {
    fontSize: 15,
    color: "#FFFFFF",
    marginTop: 5,
  },
  lista: {
    padding: 12,
    paddingBottom: 30,
  },
  linha: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
    elevation: 3,
  },
  numero: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "#888",
    fontWeight: "bold",
  },
  imagem: {
    width: 125,
    height: 125,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    textTransform: "capitalize",
  },
  tipos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  tipo: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 3,
  },
  textoTipo: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  rodape: {
    padding: 20,
    alignItems: "center",
  },
  erro: {
    color: "#D32F2F",
    textAlign: "center",
  },
});
