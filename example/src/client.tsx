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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoS2V5IjoiMmFlZTE0MmItMTg1My00MjYzLWEzYTMtYTRhMWQ5MTliOWRkLTE2MTMyMzU0Nzc0MjAiLCJkdCI6MTYyMTA3MDg4OTU1MiwiaWF0IjoxNjIxMDcwODg5fQ.WxjcEtp_VMPK4ocECsCNx1ihJhBQKAmvelhorHlwAXA',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJhY2stbHN5eXgxcmltLTE2MjEwNzAyNDA0OTEiLCJpZCI6IjYwOWY5MWEwYzU4YTY1MmQ0YzhiZjZhYyIsImR0IjoxNjIxMDcwODk0MTU1LCJpYXQiOjE2MjEwNzA4OTR9.wvx0ODMIRvpyEFqImxxcO6XGyN_b9ax2UFcHAXRbZZk',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (false) {
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
      } else {
        notification.error({ description: 'Something Went wrong. please try again!', message });
      }
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache,
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, httpLink]),
  connectToDevTools: true,
  defaultOptions: {
    mutate: { errorPolicy: 'ignore' },
  },
});

export default client;
