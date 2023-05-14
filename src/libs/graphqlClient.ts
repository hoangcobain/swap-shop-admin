import { GraphQLClient } from 'graphql-request';

const API_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_GRAPHQL_URL
        : ('http://localhost:4000/graphql' as string);

const graphQLClient = new GraphQLClient(API_URL as string, {
    // headers: {
    // Authorization: `Bearer ${process.env.API_KEY}`,
    // },
    credentials: 'include',
});

export default graphQLClient;
