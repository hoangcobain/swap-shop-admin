import graphQLClient from 'src/libs/graphqlClient';
import { User } from 'src/types/user.type';
import { SuccessUserResponse } from 'src/types/util.type';
import {
    getUsersDocument,
    loginDocument,
    meDocument,
    logoutDocument,
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
            loginDashboardAdmin: SuccessUserResponse<User>;
        }>(loginDocument, {
            ...body,
        });
        return { loginDashboardAdmin };
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
};

export default userService;
