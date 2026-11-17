export type Recorrencia = 'unica' | 'diaria';

export interface Lembrete {
  id: string;
  titulo: string;
  descricao: string;
  hora: number;
  minuto: number;
  recorrencia: Recorrencia;
  notificationId: string; 
}