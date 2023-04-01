import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.REACT_APP_GRAPHQL_URL as string;

const graphQLClient = new GraphQLClient(API_URL, {
    // headers: {
    // Authorization: `Bearer ${process.env.API_KEY}`,
    // },
    credentials: 'include',
});

export default graphQLClient;
