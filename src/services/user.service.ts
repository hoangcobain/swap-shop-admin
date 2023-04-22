import graphQLClient from 'src/libs/graphqlClient';
import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/util.type';
import {
    getUsersDocument,
    loginDocument,
    meDocument,
    logoutDocument,
    changeStatusUserDocument,
} from 'src/graphql/document';

const userService = {
    getUsers: async () => {
        const { getAllUser } = await graphQLClient.request<{
            getAllUser: User[] | null;
        }>(getUsersDocument);
        return getAllUser;
    },
    login: async (body: {
        loginInput: {
            usernameOrEmail: string;
            password: string;
        };
    }) => {
        const { loginDashboardAdmin } = await graphQLClient.request<{
            loginDashboardAdmin: SuccessResponse<User, 'user'>;
        }>(loginDocument, body);
        return loginDashboardAdmin;
    },
    me: async () => {
        const { me } = await graphQLClient.request<{
            me: User | null;
        }>(meDocument);
        return me;
    },
    logout: async () => {
        const logout = await graphQLClient.request<Boolean>(logoutDocument);
        return logout;
    },
    changeStatusUser: async (body: { status: string; userId: string }) => {
        const { changeStatusUser } = await graphQLClient.request<{
            changeStatusUser: SuccessResponse<User, 'article'>;
        }>(changeStatusUserDocument, body);
        return changeStatusUser;
    },
};

export default userService;
