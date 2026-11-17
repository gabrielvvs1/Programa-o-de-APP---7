import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputHora: {
    width: 80,
    textAlign: 'center',
  },

  doisPontos: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  botaoMetade: {
    flex: 1,
    marginHorizontal: 4,
  },
  vazio: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInfo: {
    color: '#555',
    marginVertical: 6,
  },
});