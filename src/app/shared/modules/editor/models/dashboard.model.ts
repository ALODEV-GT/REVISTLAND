export interface Stats {
  wallet: Stat;
  likes: Stat;
  comments: Stat;
  subscriptions: Stat;
}

export interface Stat {
  totalCurrentMonth: number;
  trend?: number;
}

export type Performance = Array<{
  name: string;
  data: Array<{ x: string; y: number }>;
}>;

export type TopMagazines = Array<{
  name: string;
  data: Array<number>;
}>;

export interface Chart<T> {
  tags: string[];
  data: T;
}

export interface ChartPlot {
  groupBy: string;
  likes: number;
  comments: number;
  subscriptions: number;
}

export interface SubscriptionsResume {
  activePercent: number;
  inactivePercent: number;
}

export interface ExpiredAdBlock {
  expirationDate: string;
  magazineTitle: string;
}

export type ExpiredAdBlocks = Array<{
  date: Date;
  title: string;
}>;
