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
export const UpdatePostDocument = gql`
  mutation updatePost($input: UpdatePostInput!, $id: ID!) {
    updatePost(input: $input, id: $id) {
      id
    }
  }
`;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>(
    UpdatePostDocument,
    baseOptions,
  );
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<Types.UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.UpdatePostMutation,
  Types.UpdatePostMutationVariables
>;
export const CreatePostDocument = gql`
  mutation createPost($body: String = "", $title: String = "") {
    createPost(input: { title: $title, body: $body }) {
      id
    }
  }
`;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.CreatePostMutation,
  Types.CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.CreatePostMutation, Types.CreatePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.CreatePostMutation, Types.CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<Types.CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.CreatePostMutation,
  Types.CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.DeletePostMutation, Types.DeletePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.DeletePostMutation, Types.DeletePostMutationVariables>(
    DeletePostDocument,
    baseOptions,
  );
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<Types.DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.DeletePostMutation,
  Types.DeletePostMutationVariables
>;
