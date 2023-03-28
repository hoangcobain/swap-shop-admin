import { gql } from 'graphql-request';

export const loginDocument = gql`
    mutation LoginDashboardAdmin($loginInput: LoginInput!) {
        loginDashboardAdmin(loginInput: $loginInput) {
            code
            message
            success
            user {
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
    }
`;

export const meDocument = gql`
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

export const getUsersDocument = gql`
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
`;

export const logoutDocument = gql`
    mutation Logout {
        logout
    }
`;
