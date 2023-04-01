import { articlesDocument } from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Article } from 'src/types/article.type';
import { QueryConfig, SuccessResponsePagination } from 'src/types/util.type';

const articleService = {
    getArticles: async (queryConfig: QueryConfig) => {
        const { articles } = await graphQLClient.request<{
            articles: SuccessResponsePagination<Article[], 'articles'>;
        }>(articlesDocument, {
            queryConfig,
        });
        return articles;
    },
};

export default articleService;
