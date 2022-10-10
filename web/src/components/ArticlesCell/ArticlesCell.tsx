import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

// Article component (used to refactor common HTML in cells ArticlesCell and ArticleCell)
import Article from 'src/components/Article'

// GraphQL query: we need to use a "mapping" or alias in the NAME OF THE QUERY,
// from "articles" to posts, because indeed, the data model we're accessing with this ArticlesCell
// is the Posts model (see /api/src/graphql/posts.sdl.ts), where the name of the query is "posts",
// not "articles", that's the reason for the use of this "mapping" or alias

// More, the name of the query ("articles", mapped to "posts"), is what we passed as a prop that
// we passed in the Success component
export const QUERY = gql`
  query ArticlesQuery {
    # we use here the alias "article", this is what we pass as prop to the Sucess component
    # also, with the cell generator, it only adds the field "id" to the query, lets add the
    # additional field we need to get from DB: title, body, createdAt
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

// Component Loading
export const Loading = () => <div>Loading...</div>
// Component Empty
export const Empty = () => <div>Empty</div>
// Component Failure
export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)
// Component Success: receives the name of the top query ("articles") as a prop
export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  /*return (
    <ul>
      {articles.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )*/

  return articles.map((article) => (
    <Article key={article.id} article={article} />
  ))
}
