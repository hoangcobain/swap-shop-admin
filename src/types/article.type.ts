import { Category } from './category.type';
import { User } from './user.type';

export type ArticleStatus = 'active' | 'inactive' | 'blocked';

export interface Article {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    price: number | null;
    name: string;
    categories: Category[];
    user: User;
    createdDate: string;
    updatedDate: string;
    status: ArticleStatus;
    views: number;
    favoritesCount: number;
}
