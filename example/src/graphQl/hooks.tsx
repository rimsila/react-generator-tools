import * as Types from './operations';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export const PostsDocument = gql`
  query posts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<Types.PostsQuery, Types.PostsQueryVariables>(PostsDocument, baseOptions);
}
export function usePostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<Types.PostsQuery, Types.PostsQueryVariables>(PostsDocument, baseOptions);
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<Types.PostsQuery, Types.PostsQueryVariables>;
