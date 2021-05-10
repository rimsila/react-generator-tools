import { graphBaseUrlTest } from '@/constants/server';
import { ApolloClient } from '@apollo/client';

import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({});

const client = new ApolloClient({
  cache,
  uri: graphBaseUrlTest,
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  connectToDevTools: true,
});

export default client;
