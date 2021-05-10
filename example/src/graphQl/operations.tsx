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
