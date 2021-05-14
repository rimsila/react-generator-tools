import * as Types from './operations';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export const LoginDocument = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      id
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export const GetJobsDocument = gql`
  query getJobs($filter: JobFilter = {}) {
    getJobs(filter: $filter) {
      metadata {
        limit
        page
        total
      }
      records {
        grossSalary
        id
        status
        title
      }
    }
  }
`;

/**
 * __useGetJobsQuery__
 *
 * To run a query within a React component, call `useGetJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetJobsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetJobsQuery, Types.GetJobsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<Types.GetJobsQuery, Types.GetJobsQueryVariables>(GetJobsDocument, baseOptions);
}
export function useGetJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetJobsQuery, Types.GetJobsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<Types.GetJobsQuery, Types.GetJobsQueryVariables>(GetJobsDocument, baseOptions);
}
export type GetJobsQueryHookResult = ReturnType<typeof useGetJobsQuery>;
export type GetJobsLazyQueryHookResult = ReturnType<typeof useGetJobsLazyQuery>;
export type GetJobsQueryResult = ApolloReactCommon.QueryResult<Types.GetJobsQuery, Types.GetJobsQueryVariables>;
export const DeleteJobsDocument = gql`
  mutation deleteJobs($id: String = "") {
    deleteJob(id: $id)
  }
`;
export type DeleteJobsMutationFn = ApolloReactCommon.MutationFunction<
  Types.DeleteJobsMutation,
  Types.DeleteJobsMutationVariables
>;

/**
 * __useDeleteJobsMutation__
 *
 * To run a mutation, you first call `useDeleteJobsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobsMutation, { data, loading, error }] = useDeleteJobsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJobsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.DeleteJobsMutation, Types.DeleteJobsMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.DeleteJobsMutation, Types.DeleteJobsMutationVariables>(
    DeleteJobsDocument,
    baseOptions,
  );
}
export type DeleteJobsMutationHookResult = ReturnType<typeof useDeleteJobsMutation>;
export type DeleteJobsMutationResult = ApolloReactCommon.MutationResult<Types.DeleteJobsMutation>;
export type DeleteJobsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.DeleteJobsMutation,
  Types.DeleteJobsMutationVariables
>;
export const CreateJobDocument = gql`
  mutation createJob($input: JobInput!) {
    createJob(input: $input) {
      grossSalary
      id
      status
      title
    }
  }
`;
export type CreateJobMutationFn = ApolloReactCommon.MutationFunction<
  Types.CreateJobMutation,
  Types.CreateJobMutationVariables
>;

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.CreateJobMutation, Types.CreateJobMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.CreateJobMutation, Types.CreateJobMutationVariables>(
    CreateJobDocument,
    baseOptions,
  );
}
export type CreateJobMutationHookResult = ReturnType<typeof useCreateJobMutation>;
export type CreateJobMutationResult = ApolloReactCommon.MutationResult<Types.CreateJobMutation>;
export type CreateJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.CreateJobMutation,
  Types.CreateJobMutationVariables
>;
export const UpdateJobsDocument = gql`
  mutation updateJobs($input: JobUpdate = { id: "" }) {
    updateJob(input: $input)
  }
`;
export type UpdateJobsMutationFn = ApolloReactCommon.MutationFunction<
  Types.UpdateJobsMutation,
  Types.UpdateJobsMutationVariables
>;

/**
 * __useUpdateJobsMutation__
 *
 * To run a mutation, you first call `useUpdateJobsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobsMutation, { data, loading, error }] = useUpdateJobsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateJobsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.UpdateJobsMutation, Types.UpdateJobsMutationVariables>,
) {
  return ApolloReactHooks.useMutation<Types.UpdateJobsMutation, Types.UpdateJobsMutationVariables>(
    UpdateJobsDocument,
    baseOptions,
  );
}
export type UpdateJobsMutationHookResult = ReturnType<typeof useUpdateJobsMutation>;
export type UpdateJobsMutationResult = ApolloReactCommon.MutationResult<Types.UpdateJobsMutation>;
export type UpdateJobsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.UpdateJobsMutation,
  Types.UpdateJobsMutationVariables
>;
