import { SubCategory } from './index';

export class Category {
  id: string;
  name: string;
  slug: string;
  sub_categories: Array<SubCategory>;
}