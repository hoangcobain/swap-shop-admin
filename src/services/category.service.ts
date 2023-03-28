import {
    categoriesDocument,
    insertCategoryDocument,
} from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Category } from 'src/types/category.type';
import { SuccessCategoryResponse } from 'src/types/util.type';

const categoryService = {
    getCategories: async () => {
        const { categories } = await graphQLClient.request<{
            categories: Category[] | null;
        }>(categoriesDocument);
        return categories;
    },
    insertCategory: async (body: { name: string; image: string }) => {
        const { insertCategory } = await graphQLClient.request<{
            insertCategory: SuccessCategoryResponse;
        }>(insertCategoryDocument, body);
        return insertCategory;
    },
};

export default categoryService;
