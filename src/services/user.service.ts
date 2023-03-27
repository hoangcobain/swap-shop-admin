import graphQLClient from 'src/libs/graphqlClient';
import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/util.type';
import {
    getUsersDocument,
    loginDocument,
    meDocument,
    logoutDocument,
} from 'src/graphql/document';

const userService = {
    getUsers: async () => {
        const { getAllUser } = await graphQLClient.request<{
            getAllUser: User[];
        }>(getUsersDocument);
        return getAllUser;
    },
    login: async (body: {
        loginInput: {
            usernameOrEmail: string;
            password: string;
        };
    }) => {
        const { login } = await graphQLClient.request<{
            login: SuccessResponse<User>;
        }>(loginDocument, {
            ...body,
        });
        return { login };
    },
    me: async () => {
        const { me } = await graphQLClient.request<{
            me: User;
        }>(meDocument);
        return me;
    },
    logout: async () => {
        const logout = await graphQLClient.request<Boolean>(logoutDocument);
        return logout;
    },
};

export default userService;
