import { graphBaseUrlTest } from '@/constants/server';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

export const cache: InMemoryCache = new InMemoryCache({});
const isDev = process.env.NODE_ENV === 'development';
const httpLink = new HttpLink({
  uri: graphBaseUrlTest,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (isDev) {
        notification.error({
          message: (
            <>
              [GraphQL error]: Message:
              <Text type="danger">{message}</Text>
              <br />
              Location:
              <Text type="danger">{JSON.stringify(locations)}</Text>
              <br />
              Path:
              {path && <Text type="danger">{path}</Text>}
            </>
          ),
        });
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache,
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, httpLink]),
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  connectToDevTools: true,
});

export default client;
