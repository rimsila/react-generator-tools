import { graphBaseUrlTest } from '@/constants/server';
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';
import Text from 'antd/lib/typography/Text';
import { isEmpty } from 'lodash';
import React from 'react';

export const cache: InMemoryCache = new InMemoryCache({});
const httpLink = new HttpLink({
  uri: graphBaseUrlTest,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message || !isEmpty(locations)) {
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
