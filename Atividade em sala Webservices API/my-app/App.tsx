
import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

type Publicacao = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function App() {
  const [post, setPost] = useState<Publicacao | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [contador, setContador] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const API = "https://jsonplaceholder.typicode.com/posts";

  async function requisicao(
    metodo: string,
    id: number = 1
  ) {
    setCarregando(true);
    setMensagem("");

    try {
      const dados = {
        userId: 1,
        id,
        title: "Publicação de teste",
        body: "Exemplo utilizando o método " + metodo,
      };

      const resposta = await fetch(
        metodo === "POST" ? API : `${API}/${id}`,
        {
          method: metodo,
          headers: { "Content-Type": "application/json" },
          ...(metodo !== "GET" && metodo !== "DELETE"
            ? { body: JSON.stringify(dados) }
            : {}),
        }
      );

      if (!resposta.ok) throw new Error("Erro na requisição");

      if (metodo === "DELETE") {
        setPost(null);
      } else {
        setPost(await resposta.json());
      }

      setMensagem(metodo + " realizado com sucesso!");
    } catch (erro) {
      setMensagem("Erro ao realizar " + metodo);
    } finally {
      setCarregando(false);
    }
  }

  function proximo() {
    const id = contador >= 100 ? 1 : contador + 1;
    setContador(id);
    requisicao("GET", id);
  }

  useEffect(() => {
    requisicao("GET");
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>WEB SERVICES</Text>
      <Text style={styles.subtitulo}>Métodos HTTP</Text>

      <Text>{carregando ? "Carregando..." : mensagem}</Text>

      {post && (
        <View style={styles.card}>
          <Text>ID: {post.id}</Text>
          <Text style={styles.nome}>{post.title}</Text>
          <Text>{post.body}</Text>
        </View>
      )}

      <View style={styles.botoes}>
        <Button title="GET - Buscar" onPress={() => requisicao("GET", contador)} />
        <Button title="Próxima publicação" onPress={proximo} />
        <Button title="POST - Criar" onPress={() => requisicao("POST")} />
        <Button title="PUT - Atualizar" onPress={() => requisicao("PUT")} />
        <Button title="PATCH - Alterar" onPress={() => requisicao("PATCH")} />
        <Button title="DELETE - Excluir" onPress={() => requisicao("DELETE")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#F5F5F5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  botoes: {
  gap: 12,
  marginTop: 20,
  width: "15%",
  alignSelf: "center",
},
});
