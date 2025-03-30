interface BaseMagazine {
  id: number;
  title: string;
  description: string;
  adBlockingExpirationDate?: string;
  disableLikes?: boolean;
  disableComments?: boolean;
  disableSuscriptions?: boolean;
}

export type FlatMagazine = BaseMagazine & {
  costPerDay?: number;
  categoryName: string;
  tagNames: string[];
  issuesCount: number;
  subscriptionsCount: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type EditMagazine = Omit<BaseMagazine, 'id'> & {
  categoryId: number;
  tagIds: number[];
};


export interface Issue {
  id: number;
  title: string;
  pdfUrl: string;
  magazineId: number;
  magazineTitle: string;
  publishedAt: string;
  updatedAt: string;
}

export type NewMagazine = EditMagazine;

export interface MinimalMagazine {
  id: number;
  title: string;
}
