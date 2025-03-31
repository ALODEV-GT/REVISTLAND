import { Banknote, Eye, Heart, MessagesSquare } from 'lucide-angular';

export type ReportType = 'comments' | 'suscriptions' | 'likes' | 'payments';

export interface Report {
  type: ReportType;
  name: string;
  totalTitle: string;
  averageTitle: string;
  Icon: typeof MessagesSquare;
  topTitle?: string;
}

type Nullable<T> = { [P in keyof T]?: T[P] | null };

export type ReportFilter = Nullable<{
  startDate: string;
  endDate: string;
  magazineId: number;
}>;

export interface ReportStats {
  total: number;
  averagePerMagazine: number;
}

export interface ReportData {
  headers: string[];
  data: any[][];
  stats?: ReportStats;
  topDataHeaders?: string[];
  topData?: any[][];
}

export const allReports: Report[] = [
  {
    type: 'comments',
    name: 'Reporte de comentarios',
    totalTitle: 'Total de comentarios',
    averageTitle: 'Media de comentarios por revista',
    Icon: MessagesSquare,
  },
  {
    type: 'suscriptions',
    name: 'Reporte de suscripciones',
    totalTitle: 'Total de suscripciones',
    averageTitle: 'Media de suscripciones por revista',
    Icon: Eye,
  },
  {
    type: 'likes',
    name: 'Reporte de likes',
    totalTitle: 'Total de likes',
    averageTitle: 'Media de likes por revista',
    topTitle: 'Top likes por revista',
    Icon: Heart,
  },
  {
    type: 'payments',
    name: 'Reporte de pagos',
    totalTitle: 'Total de pagos',
    averageTitle: 'Media de pagos por revista',
    Icon: Banknote,
  },
];
