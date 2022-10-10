import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

// ArticleCell
import ArticleCell from 'src/components/ArticleCell'

// We add a prop/parameter to our ArticlePage, with the ID of the article we want
// to show its details; this ID is passed by Router...
// ... And then below, when we call our ArticleCell, we pass this ID
// to it as an attribute, so the cell knows which article has to
// recover from DB
const ArticlePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <ArticleCell id={id} />
    </>
  )
}

export default ArticlePage
