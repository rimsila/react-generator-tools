import * as Types from './schemas';

export type LoginMutationVariables = Types.Exact<{
  password: Types.Scalars['String'];
  username: Types.Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginType' } & Pick<Types.LoginType, 'id'>;
};

export type GetJobsQueryVariables = Types.Exact<{
  filter?: Types.Maybe<Types.JobFilter>;
}>;

export type GetJobsQuery = { __typename?: 'Query' } & {
  getJobs: { __typename?: 'PaginatedJobType' } & {
    metadata?: Types.Maybe<{ __typename?: 'Metadata' } & Pick<Types.Metadata, 'limit' | 'page' | 'total'>>;
    records?: Types.Maybe<
      Array<{ __typename?: 'JobType' } & Pick<Types.JobType, 'grossSalary' | 'id' | 'status' | 'title'>>
    >;
  };
};

export type DeleteJobsMutationVariables = Types.Exact<{
  id?: Types.Maybe<Types.Scalars['String']>;
}>;

export type DeleteJobsMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteJob'>;

export type CreateJobMutationVariables = Types.Exact<{
  input: Types.JobInput;
}>;

export type CreateJobMutation = { __typename?: 'Mutation' } & {
  createJob: { __typename?: 'JobType' } & Pick<Types.JobType, 'grossSalary' | 'id' | 'status' | 'title'>;
};

export type UpdateJobsMutationVariables = Types.Exact<{
  input?: Types.Maybe<Types.JobUpdate>;
}>;

export type UpdateJobsMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'updateJob'>;
