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

export const categoriesDocument = gql`
    query Categories {
        categories {
            id
            name
            image
            createdDate
            updatedDate
        }
    }
`;

export const insertCategoryDocument = gql`
    mutation InsertCategory($name: String!, $image: String!) {
        insertCategory(name: $name, image: $image) {
            message
            success
            code
            category {
                id
                name
                image
                createdDate
                updatedDate
            }
        }
    }
`;
