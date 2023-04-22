import {
    articlesDocument,
    changeStatusArticleDocument,
} from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Article } from 'src/types/article.type';
import {
    QueryConfig,
    SuccessResponse,
    SuccessResponsePagination,
} from 'src/types/util.type';

const articleService = {
    getArticles: async (queryConfig: QueryConfig) => {
        const { articles } = await graphQLClient.request<{
            articles: SuccessResponsePagination<Article[], 'articles'>;
        }>(articlesDocument, {
            queryConfig,
        });
        return articles;
    },
    changeStatusArticle: async (body: {
        status: string;
        articleId: string;
    }) => {
        const { changeStatusArticle } = await graphQLClient.request<{
            changeStatusArticle: SuccessResponse<Article, 'article'>;
        }>(changeStatusArticleDocument, body);
        return changeStatusArticle;
    },
};

export default articleService;
