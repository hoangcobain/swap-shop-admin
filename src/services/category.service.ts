import {
    categoriesDocument,
    insertCategoryDocument,
    updateCategoryDocument,
} from 'src/graphql/document';
import graphQLClient from 'src/libs/graphqlClient';
import { Category } from 'src/types/category.type';
import { SuccessResponse } from 'src/types/util.type';

const categoryService = {
    getCategories: async () => {
        const { categories } = await graphQLClient.request<{
            categories: Category[] | null;
        }>(categoriesDocument);
        return categories;
    },
    insertCategory: async (body: { name: string; image: string }) => {
        const { insertCategory } = await graphQLClient.request<{
            insertCategory: SuccessResponse<Category, 'category'>;
        }>(insertCategoryDocument, body);
        return insertCategory;
    },
    updateCategory: async (body: {
        updateCategoryInput: Omit<Category, 'createdDate' | 'updatedDate'>;
    }) => {
        const { updateCategory } = await graphQLClient.request<{
            updateCategory: SuccessResponse<Category, 'category'>;
        }>(updateCategoryDocument, body);
        return updateCategory;
    },
};

export default categoryService;
