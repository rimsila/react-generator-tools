import * as Types from './schemas';

export type PostsQueryVariables = Types.Exact<{
  options?: Types.Maybe<Types.PageQueryOptions>;
}>;

export type PostsQuery = { __typename?: 'Query' } & {
  posts?: Types.Maybe<
    { __typename?: 'PostsPage' } & {
      data?: Types.Maybe<Array<Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'title'>>>>;
      meta?: Types.Maybe<{ __typename?: 'PageMetadata' } & Pick<Types.PageMetadata, 'totalCount'>>;
    }
  >;
};

export type UpdatePostMutationVariables = Types.Exact<{
  input: Types.UpdatePostInput;
  id: Types.Scalars['ID'];
}>;

export type UpdatePostMutation = { __typename?: 'Mutation' } & {
  updatePost?: Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id'>>;
};

export type CreatePostMutationVariables = Types.Exact<{
  body?: Types.Maybe<Types.Scalars['String']>;
  title?: Types.Maybe<Types.Scalars['String']>;
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id'>>;
};

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeletePostMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deletePost'>;
