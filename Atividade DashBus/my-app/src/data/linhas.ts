export interface Linha {
  id: string;
  codigo: string;
  origem: string;
  destino: string;
  qtdOnibus: number;
  passageiros: number;
  tempoMedio: number;
  percentualAtrasos: number; 
  ocupacaoMedia: number; 
  arrecadacao: number; 
}

export const linhas: Linha[] = [
  {
    id: '1',
    codigo: '0.111',
    origem: 'Ceilândia',
    destino: 'Rodoviária do Plano Piloto',
    qtdOnibus: 12,
    passageiros: 8400,
    tempoMedio: 55,
    percentualAtrasos: 18,
    ocupacaoMedia: 82,
    arrecadacao: 25200,
  },
  {
    id: '2',
    codigo: '0.204',
    origem: 'Taguatinga',
    destino: 'Águas Claras',
    qtdOnibus: 8,
    passageiros: 5100,
    tempoMedio: 25,
    percentualAtrasos: 6,
    ocupacaoMedia: 65,
    arrecadacao: 15300,
  },
  {
    id: '3',
    codigo: '0.310',
    origem: 'Samambaia',
    destino: 'Rodoviária do Plano Piloto',
    qtdOnibus: 15,
    passageiros: 9800,
    tempoMedio: 62,
    percentualAtrasos: 24,
    ocupacaoMedia: 90,
    arrecadacao: 29400,
  },
  {
    id: '4',
    codigo: '0.415',
    origem: 'Gama',
    destino: 'Santa Maria',
    qtdOnibus: 6,
    passageiros: 3200,
    tempoMedio: 20,
    percentualAtrasos: 4,
    ocupacaoMedia: 58,
    arrecadacao: 9600,
  },
];