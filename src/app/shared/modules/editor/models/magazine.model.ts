interface BaseMagazine {
  id: number;
  title: string;
  description: string;
  adBlockingExpirationDate: string;
  disableLikes: boolean;
  disableComments: boolean;
  disableSuscriptions: boolean;
}

export type FlatMagazine = BaseMagazine & {
  costPerDay?: number;
  categoryName: string;
  tagsName: string[];
  issuesCount: number;
  subscriptionsCount: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type NewMagazine = Omit<BaseMagazine, 'id'> & {
  categoryId: number;
  tagIds: number[];
};

export interface MinimalMagazine {
  id: number;
  title: string;
}
