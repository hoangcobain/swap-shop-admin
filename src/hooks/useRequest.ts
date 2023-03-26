import { gql } from 'graphql-request';
import { useQuery, useMutation } from 'react-query';
import graphQLClient from 'src/libs/graphqlClient';
import { User } from 'src/types/user.type';
import { SuccessResponse } from 'src/types/util.type';

export function useGetUsers() {
    return useQuery({
        queryKey: ['get-users'],
        queryFn: async () => {
            const { getAllUser } = await graphQLClient.request<{
                getAllUser: User[];
            }>(gql`
                query Query {
                    getAllUser {
                        id
                        username
                        email
                        address
                        phoneNumber
                        fullName
                        birthday
                        avatar
                        rating
                        createdDate
                        updatedDate
                    }
                }
            `);
            return getAllUser;
        },
        staleTime: 10 * 60 * 1000,
        cacheTime: 15 * 60 * 1000,
    });
}

const mutation = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            message
            success
            code
            user {
                id
            }
        }
    }
`;

export function useLoginMutation() {
    return useMutation({
        mutationFn: async (body: {
            loginInput: {
                usernameOrEmail: string;
                password: string;
            };
        }) => {
            const { login } = await graphQLClient.request<{
                login: SuccessResponse<Pick<User, 'id'>>;
            }>(mutation, {
                ...body,
            });
            return { login };
        },
    });
}

const meDocument = gql`
    query Query {
        me {
            id
            username
            email
            address
            phoneNumber
            fullName
            birthday
            avatar
            rating
            createdDate
            updatedDate
        }
    }
`;

export function useMeQuery() {
    return useQuery({
        queryKey: ['get-user'],
        queryFn: async () => {
            const { me } = await graphQLClient.request<{
                me: User;
            }>(meDocument);
            return me;
        },
        staleTime: 10 * 60 * 1000,
        cacheTime: 15 * 60 * 1000,
    });
}
