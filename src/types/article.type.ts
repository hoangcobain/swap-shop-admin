import { Category } from './category.type';
import { User } from './user.type';

export interface Article {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    price: number;
    productName: string;
    categories: Category[];
    user: User;
    createdDate: string;
    updatedDate: string;
}
