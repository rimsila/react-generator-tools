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
  headers: {
    'api-key':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoS2V5IjoiMmFlZTE0MmItMTg1My00MjYzLWEzYTMtYTRhMWQ5MTliOWRkLTE2MTMyMzU0Nzc0MjAiLCJkdCI6MTYyMTAxNjUyNjIxMCwiaWF0IjoxNjIxMDE2NTI2fQ.zcW4q2yJh0zql5ZwZrSte5UOHqcDxKZ5VQeReSlXlfs',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJhY2stODMxZWQ0cGU2LTE2MjEwMTY2ODM5MTMiLCJpZCI6IjYwOWVjMDZiNWQ1ZTM2MzNlODA1OTU2NSIsImR0IjoxNjIxMDE2NzYxNDYyLCJpYXQiOjE2MjEwMTY3NjF9.XSR32P8BH0QolR1TsSS_aK4bzpE9X_FXBKrbUMYo4fU',
  },
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
  connectToDevTools: true,
});

export default client;
