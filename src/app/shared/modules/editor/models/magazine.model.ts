import { Category } from './category.model';
import { Tag } from './tag.model';

export interface Magazine {
  id: number;
  title: string;
  description: string;
  adBlockingExpirationDate: string;
  disableLikes: boolean;
  disableComments: boolean;
  disableSuscriptions: boolean;
  category: Category;
  tags: Tag[];
}

export type NewMagazine = Omit<Magazine, 'id' | 'category' | 'tags'> & {
  categoryId: number;
  tagIds: number[];
};
