import { Category } from './category.type';
import { User } from './user.type';

export interface SuccessUserResponse {
    message: string;
    success: boolean;
    code: number;
    user: User;
}

export interface SuccessCategoryResponse {
    message: string;
    success: boolean;
    code: number;
    category: Category;
}
