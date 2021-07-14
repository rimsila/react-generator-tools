import * as Types from './schemas';

export type GetPostsQueryVariables = Types.Exact<{
  options?: Types.Maybe<Types.PageQueryOptions>;
}>;

export type GetPostsQuery = { __typename?: 'Query' } & {
  posts?: Types.Maybe<
    { __typename?: 'PostsPage' } & {
      data?: Types.Maybe<Array<Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'title' | 'body'>>>>;
      meta?: Types.Maybe<{ __typename?: 'PageMetadata' } & Pick<Types.PageMetadata, 'totalCount'>>;
    }
  >;
};

export type UpdatePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  input: Types.UpdatePostInput;
}>;

export type UpdatePostMutation = { __typename?: 'Mutation' } & {
  updatePost?: Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'body'>>;
};

export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Types.Maybe<{ __typename?: 'Post' } & Pick<Types.Post, 'id' | 'body'>>;
};

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeletePostMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deletePost'>;
