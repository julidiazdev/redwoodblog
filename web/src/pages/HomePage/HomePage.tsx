import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <>
        <h2>Homepage</h2>
        <p>Welcome!!!!</p>
        <ArticlesCell />
      </>
    </>
  )
}

export default HomePage
