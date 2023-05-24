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
            roles {
                role {
                    id
                    name
                    createdDate
                    updatedDate
                }
            }
            status
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

export const changeStatusUserDocument = gql`
    mutation ChangeStatusUser($status: String!, $userId: String!) {
        changeStatusUser(status: $status, userId: $userId) {
            code
            success
            message
            user {
                id
                username
                createdDate
                updatedDate
            }
        }
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

export const updateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            code
            success
            message
            category {
                createdDate
                id
                image
                name
                updatedDate
            }
        }
    }
`;

export const articlesDocument = gql`
    query Articles($queryConfig: QueryConfig!) {
        articles(queryConfig: $queryConfig) {
            data {
                articles {
                    id
                    title
                    description
                    thumbnail
                    images
                    price
                    views
                    productName
                    categories {
                        createdDate
                        id
                        image
                        name
                        updatedDate
                    }
                    user {
                        id
                        username
                        email
                        address
                        phoneNumber
                        fullName
                        birthday
                        avatar
                        createdDate
                        updatedDate
                    }
                    status
                    createdDate
                    updatedDate
                }
                pagination {
                    page
                    limit
                    page_size
                }
            }
            message
        }
    }
`;

export const changeStatusArticleDocument = gql`
    mutation ChangeStatusArticle($status: String!, $articleId: String!) {
        changeStatusArticle(status: $status, articleId: $articleId) {
            code
            success
            article {
                id
                title
                description
                thumbnail
                images
                price
                productName
                categories {
                    id
                    name
                }
                status
                views
                createdDate
                updatedDate
            }
        }
    }
`;

export const pushNotificationDocument = gql`
    mutation PushNotification($content: String!) {
        pushNotification(content: $content) {
            success
            message
            notification {
                id
                content
                userId
                createdDate
                updatedDate
            }
        }
    }
`;

export const pushPrivateNotificationDocument = gql`
    mutation PushPrivateNotification($recipientId: String!, $content: String!) {
        pushPrivateNotification(recipientId: $recipientId, content: $content) {
            success
            message
            notification {
                id
                content
                userId
                createdDate
                updatedDate
            }
        }
    }
`;

export const publicNotificationsDocument = gql`
    query NotificationsPublic {
        notificationsPublic {
            id
            content
            createdDate
            updatedDate
        }
    }
`;

export const changeNotificationDocument = gql`
    mutation ChangeNotification($content: String!, $notificationId: String!) {
        changeNotification(content: $content, notificationId: $notificationId) {
            success
            message
        }
    }
`;

export const reportsDocument = gql`
    query Reports {
        reportsList {
            user {
                id
                username
                fullName
            }
            reason
            id
            description
            createdDate
            updatedDate
            article {
                id
                title
            }
        }
    }
`;
