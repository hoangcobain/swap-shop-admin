import { Article } from './article.type';
import { User } from './user.type';

export interface Report {
    id: string;
    reason: string;
    description: string;
    article: Article;
    user: User;
    createdDate: string;
    updatedDate: string;
}
