import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

// Article component (used to refactor common HTML in cells ArticlesCell and ArticleCell)
import Article from 'src/components/Article'

// GraphQL query: we need to use a "mapping" or alias in the NAME OF THE QUERY,
// from "article" to "post", because indeed, the data model we're accessing with this ArticleCell
// is the Post model (see /api/src/graphql/posts.sdl.ts), where the name of the query is "post",
// not "article", that's the reason for the use of this "mapping" or alias

// More, the name of the query ("article", mapped to "post"), is what we passed as a prop that
// we passed in the Success component
export const QUERY = gql`
  query FindArticleQuery($id: Int!) {
    # we use here the alias "article", this is what we pass as prop to the Sucess component
    # also, with the cell generator, it only adds the field "id" to the query, lets add the
    # additional field we need to get from DB: title, body, createdAt
    article: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

// Component Success: receives the name of the top query ("article") as a prop
export const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return <Article article={article} />
}
